import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Trophy, Zap, MapPin } from 'lucide-react';
import { API_BASE_URL } from '../../config';

import {
  HomeContainer, HeroBanner, DDayBadge, RaceTitle, RaceInfo,
  SectionTitle, GridContainer, DriverCard, RankBadge
} from './style';

const TEAM_COLORS = {
  'Red Bull': ['#3671C6', '#1B3A80'],
  'Ferrari': ['#E8002D', '#A50016'],
  'McLaren': ['#FF8000', '#E5721A'],
  'Mercedes': ['#27F4D2', '#1A9A85'],
  'Aston Martin': ['#229971', '#165C44'],
  'Alpine': ['#FF87BC', '#E55A9C'],
  'Williams': ['#64C4FF', '#0093D0'],
  'RB': ['#6692FF', '#1434CB'],
  'Kick Sauber': ['#52E252', '#00A300'],
  'Haas F1 Team': ['#B6BABD', '#808285'],
};

const Home = () => {
  const navigate = useNavigate();
  const [nextRace, setNextRace] = useState(null);
  const [topDrivers, setTopDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState('2025');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API_BASE_URL}/schedule?season=${season}`).then(res => res.json()),
      fetch(`${API_BASE_URL}/standings/drivers?season=${season}`).then(res => res.json())
    ])
      .then(([scheduleRes, standingsRes]) => {
        // 다음 레이스 찾기 (UPCOMING 중 첫 번째, 없으면 마지막 FINISHED)
        if (scheduleRes.success && scheduleRes.data.races) {
          const races = scheduleRes.data.races;
          const upcomingRace = races.find(r => r.status === 'UPCOMING');
          const lastFinished = races.filter(r => r.status === 'FINISHED').pop();
          setNextRace(upcomingRace || lastFinished);
        }

        // TOP 3 드라이버
        if (standingsRes.success && standingsRes.data.standings) {
          const top3 = standingsRes.data.standings.slice(0, 3).map(entry => ({
            rank: entry.position,
            name: entry.driver.nameKr,
            nameEn: entry.driver.nameEn,
            team: entry.driver.team,
            points: entry.points,
            color: TEAM_COLORS[entry.driver.team] || ['#666', '#333']
          }));
          setTopDrivers(top3);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [season]);

  // D-Day 계산
  const calculateDDay = (dateStr) => {
    if (!dateStr) return '';
    const raceDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    raceDate.setHours(0, 0, 0, 0);
    const diff = Math.ceil((raceDate - today) / (1000 * 60 * 60 * 24));
    if (diff > 0) return `D-${diff}`;
    if (diff === 0) return 'D-DAY';
    return `D+${Math.abs(diff)}`;
  };

  if (loading) return <div style={{padding:'2rem', color:'white'}}>Loading...</div>;

  return (
    <HomeContainer>
      {/* 1. 메인 배너 */}
      {nextRace && (
        <HeroBanner onClick={() => nextRace.status === 'FINISHED' && navigate(`/race/${nextRace.round}`)}>
          <DDayBadge>
            {nextRace.status === 'UPCOMING' ? 'NEXT RACE' : 'LAST RACE'} • {calculateDDay(nextRace.date)}
          </DDayBadge>
          <RaceTitle>{nextRace.countryFlag} {nextRace.raceNameKr}</RaceTitle>
          <RaceInfo>
            <Calendar size={18} /> {nextRace.date}
          </RaceInfo>
          <RaceInfo style={{ marginTop: '4px' }}>
            <MapPin size={18} /> {nextRace.circuitKr}
          </RaceInfo>
        </HeroBanner>
      )}

      {/* 2. 드라이버 순위 미리보기 */}
      <div style={{ marginTop: '2rem' }}>
        <SectionTitle>
          <Trophy size={20} /> {season} 시즌 <span>TOP 3</span> 드라이버
        </SectionTitle>

        <GridContainer>
          {topDrivers.map((driver) => (
            <DriverCard
              key={driver.rank}
              $colorStart={driver.color[0]}
              $colorEnd={driver.color[1]}
              onClick={() => navigate('/drivers')}
            >
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
          <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>DRS가 뭔가요?</h4>
          <p style={{ lineHeight: '1.6', opacity: '0.8' }}>
            "Drag Reduction System"의 약자입니다. 뒤따라가는 차가 앞차와 1초 이내로 가까워지면 날개를 열어 공기 저항을 줄이고 속도를 높여 추월을 돕는 기능이에요!
          </p>
        </div>
      </div>

    </HomeContainer>
  );
};

export default Home;