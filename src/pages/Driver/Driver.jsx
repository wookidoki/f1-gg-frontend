import React, { useState } from 'react';
import { Search, User, Trophy } from 'lucide-react';

// 스타일 컴포넌트 임포트
import { 
  PageContainer, Header, Title, SearchBar, SearchInput, 
  GridContainer, DriverCard, TeamColorBar, DriverNumber, 
  DriverInfo, DriverName, TeamName, StatsRow, StatItem 
} from './stlye';

import { useNavigate } from 'react-router-dom';


const Drivers = () => {
  // 검색 상태 관리
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  // 드라이버 임시 데이터 (나중에 API로 대체)
  const driversData = [
    { id: 1, name: "Max Verstappen", number: 1, team: "Red Bull Racing", points: 393, color: "#0600EF" },
    { id: 2, name: "Sergio Perez", number: 11, team: "Red Bull Racing", points: 258, color: "#0600EF" },
    { id: 3, name: "Lewis Hamilton", number: 44, team: "Mercedes", points: 234, color: "#00D2BE" },
    { id: 4, name: "George Russell", number: 63, team: "Mercedes", points: 178, color: "#00D2BE" },
    { id: 5, name: "Charles Leclerc", number: 16, team: "Ferrari", points: 307, color: "#C00000" },
    { id: 6, name: "Carlos Sainz", number: 55, team: "Ferrari", points: 289, color: "#C00000" },
    { id: 7, name: "Lando Norris", number: 4, team: "McLaren", points: 331, color: "#FF8000" },
    { id: 8, name: "Oscar Piastri", number: 81, team: "McLaren", points: 220, color: "#FF8000" },
  ];

  // 검색 필터링 로직
  const filteredDrivers = driversData.filter(driver => 
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      {/* 1. 상단 헤더 및 검색창 */}
      <Header>
        <Title>
          <User size={28} /> 2024 <span>DRIVERS</span>
        </Title>
        <SearchBar>
          <Search size={18} style={{ opacity: 0.5 }} />
          <SearchInput 
            placeholder="드라이버 또는 팀 이름 검색..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </Header>

      {/* 2. 드라이버 카드 리스트 */}
      <GridContainer>
        {filteredDrivers.map((driver) => (
          <DriverCard 
            key={driver.id}
            onClick={()=> navigate(`/drivers/${driver.id}`)}>
            {/* 팀 컬러 라인 */}
            <TeamColorBar $color={driver.color} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <DriverNumber>{driver.number}</DriverNumber>
              <Trophy size={20} color={driver.color} />
            </div>

            <DriverInfo>
              <DriverName>{driver.name}</DriverName>
              <TeamName>{driver.team}</TeamName>
            </DriverInfo>

            <StatsRow>
              <StatItem>
                <span>POINTS</span>
                <strong>{driver.points}</strong>
              </StatItem>
              <StatItem>
                <span>PODIUMS</span>
                {/* 데이터가 없어서 임시값 */}
                <strong>--</strong>
              </StatItem>
            </StatsRow>
          </DriverCard>
        ))}
      </GridContainer>
    </PageContainer>
  );
};

export default Drivers;