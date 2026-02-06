import React, { useState, useEffect } from 'react';
import { Search, User, Trophy, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { API_BASE_URL, getFlagEmoji } from '../../config';
import SeasonSelector from '../../components/common/SeasonSelector/SeasonSelector';

import {
  PageContainer, Header, Title, SearchBar, SearchInput,
  GridContainer, DriverCard, TeamColorBar, DriverNumber,
  DriverInfo, DriverName, TeamName, StatsRow, StatItem
} from './style';

const Drivers = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState('');

  useEffect(() => {
    if (!season) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/drivers?season=${season}`)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          setDrivers(response.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [season]);

  // 3. 검색 필터링 (한글, 영어, 팀, 코드명(VER)까지 검색 지원)
  const filteredDrivers = drivers.filter(driver => 
    driver.nameKr.includes(searchTerm) || 
    driver.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{padding:'2rem', color:'white'}}>데이터 분석 중... 🏎️</div>;

  return (
    <PageContainer>
      <Header>
        <Title>
          <User size={28} /> {season} <span>DRIVERS</span>
        </Title>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <SeasonSelector value={season} onChange={setSeason} />
          <SearchBar>
            <Search size={18} style={{ opacity: 0.5 }} />
            <SearchInput
              placeholder="드라이버, 팀, 코드 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
        </div>
      </Header>

      <GridContainer>
        {filteredDrivers.map((driver) => (
          <DriverCard 
            key={driver.code} // 고유 ID 사용 (max_verstappen)
            onClick={() => navigate(`/drivers/${driver.code}`)}
          >
            <TeamColorBar $color={driver.teamColor} />
            
            {/* 상단: 등번호 + 국기/코드 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <DriverNumber>{driver.number}</DriverNumber>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                <span style={{ fontSize: '1.5rem' }}>{getFlagEmoji(driver.nationality)}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: '900', opacity: 0.5, fontStyle:'italic' }}>
                  {driver.code}
                </span>
              </div>
            </div>

            {/* 중간: 이름 및 팀 */}
            <DriverInfo>
              <DriverName>
                {driver.nameKr}
                {/* 영어 이름은 작게 서브로 표시 */}
                <span style={{ display:'block', fontSize:'0.6em', opacity:0.5, marginTop:'2px', fontWeight:500 }}>
                  {driver.nameEn}
                </span>
              </DriverName>
              <TeamName style={{ color: driver.teamColor }}>{driver.team}</TeamName>
            </DriverInfo>

            {/* 하단: 스탯 (포인트 + 우승 횟수) */}
            <StatsRow>
              <StatItem>
                <span>POINTS</span>
                <strong>{driver.points}</strong>
              </StatItem>
              <StatItem>
                <span>WINS</span>
                {/* 우승 횟수가 0이면 - 표시, 아니면 숫자 */}
                <strong style={{ color: driver.wins > 0 ? '#FFD700' : 'inherit' }}>
                   {driver.wins > 0 ? driver.wins : '-'}
                </strong>
              </StatItem>
              <StatItem>
                <span>RANK</span>
                <strong>{driver.rank}</strong>
              </StatItem>
            </StatsRow>
          </DriverCard>
        ))}
      </GridContainer>
    </PageContainer>
  );
};

export default Drivers;