import React, { useState, useEffect } from 'react';
import { GitCompare, User, Users } from 'lucide-react';
import { API_BASE_URL, getFlagEmoji } from '../../config';
import SeasonSelector from '../../components/common/SeasonSelector/SeasonSelector';

import {
  PageContainer, PageTitle, SelectionGrid, SelectBox, VsBox,
  DropdownOverlay, DropdownModal, DropdownSearch, DropdownList, DropdownItem,
  CompareSection, CompareRow, CompareBar
} from './style';

const Compare = () => {
  const [season, setSeason] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [driver1, setDriver1] = useState(null);
  const [driver2, setDriver2] = useState(null);
  const [selectingFor, setSelectingFor] = useState(null); // 'driver1' | 'driver2'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!season) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/standings/drivers?season=${season}`)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          setDrivers(response.data.standings.map(s => ({
            code: s.driver?.code,
            nameKr: s.driver?.nameKr,
            nameEn: s.driver?.nameEn,
            nationality: s.driver?.nationality,
            team: s.constructor?.nameKr,
            teamColor: s.constructor?.color,
            points: parseInt(s.points) || 0,
            wins: parseInt(s.wins) || 0,
            rank: s.position
          })));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [season]);

  const filteredDrivers = drivers.filter(d =>
    d.nameKr?.includes(searchTerm) ||
    d.nameEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (driver) => {
    if (selectingFor === 'driver1') {
      setDriver1(driver);
    } else {
      setDriver2(driver);
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
    if (!driver1 || !driver2) return null;
    if (driver1[key] === driver2[key]) return null;
    if (lower) {
      return driver1[key] < driver2[key] ? 'left' : 'right';
    }
    return driver1[key] > driver2[key] ? 'left' : 'right';
  };

  return (
    <PageContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <PageTitle>
          <GitCompare size={28} color="#e10600" />
          드라이버 비교
        </PageTitle>
        <SeasonSelector value={season} onChange={setSeason} />
      </div>

      {/* 선택 영역 */}
      <SelectionGrid>
        <SelectBox
          $selected={!!driver1}
          $color={driver1?.teamColor}
          onClick={() => setSelectingFor('driver1')}
        >
          <div className="label">드라이버 1</div>
          {driver1 ? (
            <div className="selected-name">
              {getFlagEmoji(driver1.nationality)} {driver1.nameKr}
            </div>
          ) : (
            <div className="placeholder">선택하세요</div>
          )}
        </SelectBox>

        <VsBox>VS</VsBox>

        <SelectBox
          $selected={!!driver2}
          $color={driver2?.teamColor}
          onClick={() => setSelectingFor('driver2')}
        >
          <div className="label">드라이버 2</div>
          {driver2 ? (
            <div className="selected-name">
              {getFlagEmoji(driver2.nationality)} {driver2.nameKr}
            </div>
          ) : (
            <div className="placeholder">선택하세요</div>
          )}
        </SelectBox>
      </SelectionGrid>

      {/* 비교 결과 */}
      {driver1 && driver2 && (
        <CompareSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: driver1.teamColor }} />
              <span style={{ fontWeight: 600 }}>{driver1.team}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 600 }}>{driver2.team}</span>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: driver2.teamColor }} />
            </div>
          </div>

          {compareStats.map(stat => {
            const winner = getWinner(stat.key, stat.lower);
            const total = (driver1[stat.key] || 0) + (driver2[stat.key] || 0);
            const leftPct = total > 0 ? ((driver1[stat.key] || 0) / total) * 100 : 50;

            return (
              <CompareRow key={stat.key}>
                <div className={`stat-value left ${winner === 'left' ? 'winner' : ''}`}>
                  {driver1[stat.key]}
                </div>
                <div className="stat-label">{stat.label}</div>
                <div className={`stat-value right ${winner === 'right' ? 'winner' : ''}`}>
                  {driver2[stat.key]}
                </div>
              </CompareRow>
            );
          })}

          <CompareBar $leftColor={driver1.teamColor} $rightColor={driver2.teamColor}>
            <div
              className="left-bar"
              style={{ width: `${(driver1.points / (driver1.points + driver2.points)) * 100}%` }}
            />
            <div
              className="right-bar"
              style={{ width: `${(driver2.points / (driver1.points + driver2.points)) * 100}%` }}
            />
          </CompareBar>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.85rem', color: '#888' }}>
            <span>포인트 비율</span>
            <span>{Math.round((driver1.points / (driver1.points + driver2.points)) * 100)}% : {Math.round((driver2.points / (driver1.points + driver2.points)) * 100)}%</span>
          </div>
        </CompareSection>
      )}

      {/* 드라이버 선택 모달 */}
      {selectingFor && (
        <DropdownOverlay onClick={() => { setSelectingFor(null); setSearchTerm(''); }}>
          <DropdownModal onClick={e => e.stopPropagation()}>
            <DropdownSearch>
              <input
                type="text"
                placeholder="드라이버 검색..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                autoFocus
              />
            </DropdownSearch>
            <DropdownList>
              {filteredDrivers.map(driver => (
                <DropdownItem
                  key={driver.code}
                  $color={driver.teamColor}
                  onClick={() => handleSelect(driver)}
                >
                  <User size={20} />
                  <div className="info">
                    <div className="name">{getFlagEmoji(driver.nationality)} {driver.nameKr}</div>
                    <div className="sub">{driver.team} • {driver.code}</div>
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
