import React, { useState } from "react";
import { Search, User, Trophy } from 'lucide-react';
import { 
  PageContainer, Header, Title, SearchBar, SearchInput, 
  GridContainer, DriverCard, TeamColorBar, DriverNumber, 
  DriverInfo, DriverName, TeamName, StatsRow, StatItem 
} from './style';

const Drivers = () => {
    //검색상태관리
    const [searchTerm, setSearchTerm] = useState('');

    const driversData = [
        {id:1, name: 'asd', number:1, team: 'asd', points: 123, color:"#0600EF"}
    ]

const filterdDriver = driversData.filter(driver =>
    driver.name.toLowercase().include(searchTerm.toLowercase()) ||
    driver.team.toLowercase().include(searchTerm.toLowercase())
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
          <DriverCard key={driver.id}>
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