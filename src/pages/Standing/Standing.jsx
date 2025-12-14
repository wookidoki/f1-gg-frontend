import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, MapPin, Flag, Calendar, ChevronRight } from 'lucide-react';

import { 
  PageContainer, TopRankSection, RankCard, 
  HeroRaceCard, HeroContent, WinnerBadge, 
  SectionTitle, RaceList, RaceItem, StatusBadge 
} from './style';

const Standings = () => {
  const navigate = useNavigate();

  // Mock Data: 컨스트럭터(팀) 순위
  const teamStandings = [
    { rank: 1, name: "Red Bull Racing", points: 860, color: "#0600EF" },
    { rank: 2, name: "Ferrari", points: 406, color: "#C00000" },
    { rank: 3, name: "McLaren", points: 302, color: "#FF8000" },
  ];

  // Mock Data: 가장 최근 종료된 경기
  const lastRace = {
    id: 14,
    round: 14,
    name: "Belgian Grand Prix",
    circuit: "Circuit de Spa-Francorchamps",
    date: "2024.07.28",
    winner: "George Russell", // (실제로는 실격됐지만 예시로)
    winnerTeam: "Mercedes",
    time: "1:19:57.040",
    points: 25,
    flag: "🇧🇪"
  };

  // Mock Data: 시즌 전체 일정 (일부)
  const seasonSchedule = [
    { id: 15, round: 15, name: "Dutch Grand Prix", date: "08.25", status: "UPCOMING", flag: "🇳🇱" },
    { id: 14, round: 14, name: "Belgian Grand Prix", date: "07.28", status: "FINISHED", winner: "G. Russell", flag: "🇧🇪" },
    { id: 13, round: 13, name: "Hungarian Grand Prix", date: "07.21", status: "FINISHED", winner: "O. Piastri", flag: "🇭🇺" },
    { id: 12, round: 12, name: "British Grand Prix", date: "07.07", status: "FINISHED", winner: "L. Hamilton", flag: "🇬🇧" },
    // ... 더 많은 경기
  ];

  return (
    <PageContainer>
      
      {/* 1. 시즌 컨스트럭터 순위 (Top 3) */}
      <SectionTitle><Trophy size={18} /> 2024 CONSTRUCTOR STANDINGS</SectionTitle>
      <TopRankSection>
        {teamStandings.map((team) => (
          <RankCard key={team.rank} $color={team.color}>
            <div className="rank">#{team.rank}</div>
            <div className="info">
              <h3>{team.name}</h3>
              <p>{team.points} PTS</p>
            </div>
          </RankCard>
        ))}
      </TopRankSection>

      {/* 2. 가장 최근 경기 (Hero Card) */}
      <SectionTitle style={{ marginTop: '2rem' }}>
        <Flag size={18} /> LAST RACE RESULT
      </SectionTitle>
      
      <HeroRaceCard onClick={() => navigate(`/race/${lastRace.id}`)}>
        <div className="bg-overlay" />
        <HeroContent>
          <div className="race-info">
            <span className="round">ROUND {lastRace.round} • {lastRace.date}</span>
            <h1>{lastRace.flag} {lastRace.name}</h1>
            <p className="circuit"><MapPin size={16}/> {lastRace.circuit}</p>
          </div>
          
          <div className="winner-info">
            <span className="label">WINNER</span>
            <WinnerBadge>
              <Trophy size={20} color="#FFD700" />
              <div>
                <span className="driver">{lastRace.winner}</span>
                <span className="team">{lastRace.winnerTeam}</span>
              </div>
            </WinnerBadge>
          </div>
        </HeroContent>
      </HeroRaceCard>

      {/* 3. 전체 경기 리스트 */}
      <SectionTitle style={{ marginTop: '3rem' }}>
        <Calendar size={18} /> 2024 SEASON SCHEDULE
      </SectionTitle>
      
      <RaceList>
        {seasonSchedule.map((race) => (
          <RaceItem 
            key={race.id} 
            onClick={() => race.status === 'FINISHED' ? navigate(`/race/${race.id}`) : null}
            $isUpcoming={race.status === 'UPCOMING'}
          >
            <div className="left">
              <span className="round">R{race.round}</span>
              <span className="date">{race.date}</span>
              <span className="flag">{race.flag}</span>
              <span className="name">{race.name}</span>
            </div>
            
            <div className="right">
              {race.status === 'FINISHED' ? (
                <>
                  <span className="winner-label">Winner</span>
                  <span className="winner-name">{race.winner}</span>
                  <ChevronRight size={16} style={{ opacity: 0.5 }} />
                </>
              ) : (
                <StatusBadge>D-DAY</StatusBadge>
              )}
            </div>
          </RaceItem>
        ))}
      </RaceList>

    </PageContainer>
  );
};

export default Standings;