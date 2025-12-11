import React from 'react';
import { Calendar, Trophy, Zap } from 'lucide-react';

// 스타일 불러오기
import { 
  HomeContainer, HeroBanner, DDayBadge, RaceTitle, RaceInfo, 
  SectionTitle, GridContainer, DriverCard, RankBadge
} from './style';

const Home = () => {
  // 임시 데이터 (나중에 API로 대체될 부분)
  const nextRace = {
    title: "라스베가스 그랑프리",
    dday: "D-2",
    date: "11월 24일 (일) 15:00",
    circuit: "Las Vegas Strip Circuit"
  };

  const topDrivers = [
    { rank: 1, name: "막스 베르스타펜", team: "Red Bull", points: 393, color: ["#0600EF", "#FF0000"] },
    { rank: 2, name: "랜드 노리스", team: "McLaren", points: 331, color: ["#FF8000", "#47C7FC"] },
    { rank: 3, name: "샤를 르클레르", team: "Ferrari", points: 307, color: ["#C00000", "#111111"] },
  ];

  return (
    <HomeContainer>
      {/* 1. 메인 배너 */}
      <HeroBanner>
        <DDayBadge>NEXT RACE • {nextRace.dday}</DDayBadge>
        <RaceTitle>{nextRace.title}</RaceTitle>
        <RaceInfo>
          <Calendar size={18} /> {nextRace.date} &nbsp;|&nbsp; {nextRace.circuit}
        </RaceInfo>
      </HeroBanner>

      {/* 2. 드라이버 순위 미리보기 */}
      <div style={{ marginTop: '2rem' }}>
        <SectionTitle>
          <Trophy size={20} /> 시즌 <span>TOP 3</span> 레이서
        </SectionTitle>
        
        <GridContainer>
          {topDrivers.map((driver) => (
            <DriverCard key={driver.rank} $colorStart={driver.color[0]} $colorEnd={driver.color[1]}>
              <RankBadge>{driver.rank}</RankBadge>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '4px' }}>
                  {driver.name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: '500' }}>
                  {driver.team}
                </p>
              </div>
              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '900', fontStyle: 'italic', color: '#e10600' }}>
                  {driver.points}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#aaa', marginLeft: '4px' }}>PTS</span>
              </div>
            </DriverCard>
          ))}
        </GridContainer>
      </div>

      {/* 3. 오늘의 TMI (간단한 정보) */}
      <div style={{ marginTop: '3rem' }}>
         <SectionTitle>
          <Zap size={20} /> 오늘의 <span>F1 TMI</span>
        </SectionTitle>
        <div style={{ 
          background: 'rgba(225,6,0,0.05)', 
          border: '1px solid rgba(225,6,0,0.1)', 
          borderRadius: '16px', 
          padding: '1.5rem' 
        }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>DRS가 뭔가요? 🏎️💨</h4>
          <p style={{ lineHeight: '1.6', opacity: '0.8' }}>
            "Drag Reduction System"의 약자입니다. 뒤따라가는 차가 앞차와 1초 이내로 가까워지면 날개를 열어 공기 저항을 줄이고 속도를 높여 추월을 돕는 기능이에요!
          </p>
        </div>
      </div>

    </HomeContainer>
  );
};

export default Home;