import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Trophy, Zap } from 'lucide-react';

import { 
  PageContainer, Header, Title, SearchBar, SearchInput, 
  GridContainer, TeamCard, TeamHeader, TeamLogoPlaceholder, 
  TeamInfo, TeamName, CarModel, StatsRow, StatItem 
} from './style';

const Teams = () => {
  const navigate = useNavigate(); // 괄호() 필수!
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data: 2024 시즌 팀 데이터
  const teamsData = [
    { id: 1, name: "Red Bull Racing", car: "RB20", principal: "Christian Horner", points: 860, color: "#0600EF" },
    { id: 2, name: "Mercedes", car: "W15", principal: "Toto Wolff", points: 409, color: "#00D2BE" },
    { id: 3, name: "Ferrari", car: "SF-24", principal: "Frédéric Vasseur", points: 406, color: "#C00000" },
    { id: 4, name: "McLaren", car: "MCL38", principal: "Andrea Stella", points: 302, color: "#FF8000" },
    { id: 5, name: "Aston Martin", car: "AMR24", principal: "Mike Krack", points: 280, color: "#006F62" },
    { id: 6, name: "Alpine", car: "A524", principal: "Bruno Famin", points: 120, color: "#0090FF" },
  ];

  const filteredTeams = teamsData.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <Header>
        <Title>
          <Users size={28} /> F1 <span>CONSTRUCTORS</span>
        </Title>
        <SearchBar>
          <Search size={18} style={{ opacity: 0.5 }} />
          <SearchInput 
            placeholder="팀 이름 검색..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </Header>

      <GridContainer>
        {filteredTeams.map((team) => (
          <TeamCard 
            key={team.id} 
            $teamColor={team.color}
            onClick={() => navigate(`/teams/${team.id}`)}
          >
            <TeamHeader>
              {/* 실제로는 팀 로고 이미지가 들어갈 자리 */}
              <TeamLogoPlaceholder $color={team.color}>
                {team.name.substring(0, 1)}
              </TeamLogoPlaceholder>
              <Zap size={20} color={team.color} fill={team.color} />
            </TeamHeader>

            <TeamInfo>
              <CarModel>{team.car}</CarModel>
              <TeamName>{team.name}</TeamName>
              <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>CEO: {team.principal}</p>
            </TeamInfo>

            <StatsRow>
              <StatItem>
                <span>PTS</span>
                <strong>{team.points}</strong>
              </StatItem>
              <StatItem>
                <span>RANK</span>
                {/* 데이터 연동 시 계산 로직 필요 */}
                <strong>{team.id}위</strong> 
              </StatItem>
            </StatsRow>
          </TeamCard>
        ))}
      </GridContainer>
    </PageContainer>
  );
};

export default Teams;