import React, { useState, useEffect } from 'react';
import { GitCompare, User, Users } from 'lucide-react';
import { API_BASE_URL, getFlagEmoji } from '../../config';
import SeasonSelector from '../../components/common/SeasonSelector/SeasonSelector';

import {
  PageContainer, PageTitle, TabGroup, Tab, SelectionGrid, SelectBox, VsBox,
  DropdownOverlay, DropdownModal, DropdownSearch, DropdownList, DropdownItem,
  CompareSection, CompareRow, CompareBar
} from './style';

const Compare = () => {
  const [season, setSeason] = useState('');
  const [mode, setMode] = useState('driver'); // 'driver' | 'team'
  const [drivers, setDrivers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const [item1, setItem1] = useState(null);
  const [item2, setItem2] = useState(null);
  const [selectingFor, setSelectingFor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!season) return;
    setLoading(true);

    Promise.all([
      fetch(`${API_BASE_URL}/standings/drivers?season=${season}`).then(r => r.json()),
      fetch(`${API_BASE_URL}/standings/constructors?season=${season}`).then(r => r.json())
    ]).then(([driversRes, teamsRes]) => {
      if (driversRes.success) {
        setDrivers(driversRes.data.standings.map(s => ({
          id: s.driver?.code,
          nameKr: s.driver?.nameKr,
          nameEn: s.driver?.nameEn,
          nationality: s.driver?.nationality,
          team: s.constructor?.nameKr,
          color: s.constructor?.color,
          points: parseInt(s.points) || 0,
          wins: parseInt(s.wins) || 0,
          rank: s.position
        })));
      }
      if (teamsRes.success) {
        setTeams(teamsRes.data.standings.map(s => ({
          id: s.constructor?.constructorId,
          nameKr: s.constructor?.nameKr,
          name: s.constructor?.name,
          color: s.constructor?.color,
          points: parseInt(s.points) || 0,
          wins: parseInt(s.wins) || 0,
          rank: s.position
        })));
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [season]);

  // 모드 변경 시 선택 초기화
  useEffect(() => {
    setItem1(null);
    setItem2(null);
  }, [mode]);

  const items = mode === 'driver' ? drivers : teams;

  const filteredItems = items.filter(item => {
    const term = searchTerm.toLowerCase();
    if (mode === 'driver') {
      return item.nameKr?.includes(searchTerm) ||
             item.nameEn?.toLowerCase().includes(term) ||
             item.id?.toLowerCase().includes(term);
    }
    return item.nameKr?.includes(searchTerm) ||
           item.name?.toLowerCase().includes(term);
  });

  const handleSelect = (item) => {
    if (selectingFor === 'item1') {
      setItem1(item);
    } else {
      setItem2(item);
    }
    setSelectingFor(null);
    setSearchTerm('');
  };

  const compareStats = [
    { label: '순위', key: 'rank', lower: true },
    { label: '포인트', key: 'points' },
    { label: '우승', key: 'wins' },
  ];

  const getWinner = (key, lower = false) => {
    if (!item1 || !item2) return null;
    if (item1[key] === item2[key]) return null;
    if (lower) {
      return item1[key] < item2[key] ? 'left' : 'right';
    }
    return item1[key] > item2[key] ? 'left' : 'right';
  };

  const totalPoints = (item1?.points || 0) + (item2?.points || 0);

  return (
    <PageContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <PageTitle>
          <GitCompare size={28} color="#e10600" />
          {mode === 'driver' ? '드라이버' : '팀'} 비교
        </PageTitle>
        <SeasonSelector value={season} onChange={setSeason} />
      </div>

      {/* 탭 선택 */}
      <TabGroup>
        <Tab $active={mode === 'driver'} onClick={() => setMode('driver')}>
          <User size={18} /> 드라이버
        </Tab>
        <Tab $active={mode === 'team'} onClick={() => setMode('team')}>
          <Users size={18} /> 팀
        </Tab>
      </TabGroup>

      {/* 선택 영역 */}
      <SelectionGrid>
        <SelectBox
          $selected={!!item1}
          $color={item1?.color}
          onClick={() => setSelectingFor('item1')}
        >
          <div className="label">{mode === 'driver' ? '드라이버' : '팀'} 1</div>
          {item1 ? (
            <div className="selected-name">
              {mode === 'driver' && getFlagEmoji(item1.nationality)} {item1.nameKr}
            </div>
          ) : (
            <div className="placeholder">선택하세요</div>
          )}
        </SelectBox>

        <VsBox>VS</VsBox>

        <SelectBox
          $selected={!!item2}
          $color={item2?.color}
          onClick={() => setSelectingFor('item2')}
        >
          <div className="label">{mode === 'driver' ? '드라이버' : '팀'} 2</div>
          {item2 ? (
            <div className="selected-name">
              {mode === 'driver' && getFlagEmoji(item2.nationality)} {item2.nameKr}
            </div>
          ) : (
            <div className="placeholder">선택하세요</div>
          )}
        </SelectBox>
      </SelectionGrid>

      {/* 비교 결과 */}
      {item1 && item2 && (
        <CompareSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: item1.color }} />
              <span style={{ fontWeight: 600 }}>{mode === 'driver' ? item1.team : item1.nameKr}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 600 }}>{mode === 'driver' ? item2.team : item2.nameKr}</span>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: item2.color }} />
            </div>
          </div>

          {compareStats.map(stat => {
            const winner = getWinner(stat.key, stat.lower);
            return (
              <CompareRow key={stat.key}>
                <div className={`stat-value left ${winner === 'left' ? 'winner' : ''}`}>
                  {item1[stat.key]}
                </div>
                <div className="stat-label">{stat.label}</div>
                <div className={`stat-value right ${winner === 'right' ? 'winner' : ''}`}>
                  {item2[stat.key]}
                </div>
              </CompareRow>
            );
          })}

          {totalPoints > 0 && (
            <>
              <CompareBar $leftColor={item1.color} $rightColor={item2.color}>
                <div
                  className="left-bar"
                  style={{ width: `${(item1.points / totalPoints) * 100}%` }}
                />
                <div
                  className="right-bar"
                  style={{ width: `${(item2.points / totalPoints) * 100}%` }}
                />
              </CompareBar>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.85rem', color: '#888' }}>
                <span>포인트 비율</span>
                <span>{Math.round((item1.points / totalPoints) * 100)}% : {Math.round((item2.points / totalPoints) * 100)}%</span>
              </div>
            </>
          )}
        </CompareSection>
      )}

      {/* 선택 모달 */}
      {selectingFor && (
        <DropdownOverlay onClick={() => { setSelectingFor(null); setSearchTerm(''); }}>
          <DropdownModal onClick={e => e.stopPropagation()}>
            <DropdownSearch>
              <input
                type="text"
                placeholder={`${mode === 'driver' ? '드라이버' : '팀'} 검색...`}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                autoFocus
              />
            </DropdownSearch>
            <DropdownList>
              {filteredItems.map(item => (
                <DropdownItem
                  key={item.id}
                  $color={item.color}
                  onClick={() => handleSelect(item)}
                >
                  {mode === 'driver' ? <User size={20} /> : <Users size={20} />}
                  <div className="info">
                    <div className="name">
                      {mode === 'driver' && getFlagEmoji(item.nationality)} {item.nameKr}
                    </div>
                    <div className="sub">
                      {mode === 'driver' ? `${item.team} • ${item.id}` : item.name}
                    </div>
                  </div>
                </DropdownItem>
              ))}
            </DropdownList>
          </DropdownModal>
        </DropdownOverlay>
      )}
    </PageContainer>
  );
};

export default Compare;
