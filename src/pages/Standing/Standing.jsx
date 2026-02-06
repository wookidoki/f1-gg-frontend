import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, MapPin, Flag, Calendar, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import SeasonSelector from '../../components/common/SeasonSelector/SeasonSelector';

import {
  PageContainer, TopRankSection, RankCard,
  HeroRaceCard, HeroContent, WinnerBadge,
  SectionTitle, RaceList, RaceItem, StatusBadge
} from './style';

const Standings = () => {
  const navigate = useNavigate();
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState('');

  useEffect(() => {
    if (!season) return;
    setLoading(true);
    Promise.all([
      fetch(`${API_BASE_URL}/standings/constructors?season=${season}`).then(res => res.json()),
      fetch(`${API_BASE_URL}/schedule?season=${season}`).then(res => res.json())
    ])
      .then(([standingsRes, scheduleRes]) => {
        if (standingsRes.success) {
          setConstructorStandings(standingsRes.data.standings.slice(0, 3));
        }
        if (scheduleRes.success) {
          setSchedule(scheduleRes.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [season]);

  if (loading) return <div style={{padding:'2rem', color:'white'}}>Loading...</div>;

  // 가장 최근 완료된 경기 찾기
  const finishedRaces = schedule?.races?.filter(r => r.status === 'FINISHED') || [];
  const lastRace = finishedRaces[finishedRaces.length - 1];

  // 최근 5개 경기
  const recentRaces = schedule?.races?.slice(-8) || [];

  return (
    <PageContainer>
      {/* 시즌 선택 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <SeasonSelector value={season} onChange={setSeason} />
      </div>

      {/* 1. 시즌 컨스트럭터 순위 (Top 3) */}
      <SectionTitle><Trophy size={18} /> {schedule?.season || season} CONSTRUCTOR STANDINGS</SectionTitle>
      <TopRankSection>
        {constructorStandings.map((entry) => (
          <RankCard key={entry.position} $color={entry.constructor.color}>
            <div className="rank">#{entry.position}</div>
            <div className="info">
              <h3>{entry.constructor.nameKr}</h3>
              <p>{entry.points} PTS</p>
            </div>
          </RankCard>
        ))}
      </TopRankSection>

      {/* 2. 가장 최근 경기 (Hero Card) */}
      {lastRace && (
        <>
          <SectionTitle style={{ marginTop: '2rem' }}>
            <Flag size={18} /> LAST RACE RESULT
          </SectionTitle>

          <HeroRaceCard onClick={() => navigate(`/race/${lastRace.round}`)}>
            <div className="bg-overlay" />
            <HeroContent>
              <div className="race-info">
                <span className="round">ROUND {lastRace.round} • {lastRace.date}</span>
                <h1>{lastRace.countryFlag} {lastRace.raceNameKr}</h1>
                <p className="circuit"><MapPin size={16}/> {lastRace.circuitKr}</p>
              </div>

              {lastRace.winner && (
                <div className="winner-info">
                  <span className="label">WINNER</span>
                  <WinnerBadge>
                    <Trophy size={20} color="#FFD700" />
                    <div>
                      <span className="driver">{lastRace.winner.nameKr}</span>
                      <span className="team">{lastRace.winner.team}</span>
                    </div>
                  </WinnerBadge>
                </div>
              )}
            </HeroContent>
          </HeroRaceCard>
        </>
      )}

      {/* 3. 전체 경기 리스트 */}
      <SectionTitle style={{ marginTop: '3rem' }}>
        <Calendar size={18} /> {schedule?.season || '2024'} SEASON SCHEDULE
      </SectionTitle>

      <RaceList>
        {recentRaces.map((race) => (
          <RaceItem
            key={race.round}
            onClick={() => race.status === 'FINISHED' ? navigate(`/race/${race.round}`) : null}
            $isUpcoming={race.status === 'UPCOMING'}
          >
            <div className="left">
              <span className="round">R{race.round}</span>
              <span className="date">{race.date}</span>
              <span className="flag">{race.countryFlag}</span>
              <span className="name">{race.raceNameKr}</span>
            </div>

            <div className="right">
              {race.status === 'FINISHED' && race.winner ? (
                <>
                  <span className="winner-label">Winner</span>
                  <span className="winner-name">{race.winner.nameKr}</span>
                  <ChevronRight size={16} style={{ opacity: 0.5 }} />
                </>
              ) : (
                <StatusBadge>UPCOMING</StatusBadge>
              )}
            </div>
          </RaceItem>
        ))}
      </RaceList>

    </PageContainer>
  );
};

export default Standings;
