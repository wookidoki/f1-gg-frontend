import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Trophy, Users, Flag, Zap } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import SeasonSelector from '../../components/common/SeasonSelector/SeasonSelector';

import {
  PageContainer, PageTitle, StatsGrid, StatCard,
  Section, SectionTitle, ChartContainer, BarRow,
  TeamCompareGrid, TeamCard, WinDistribution, WinSegment
} from './style';

const Stats = () => {
  const navigate = useNavigate();
  const [season, setSeason] = useState('');
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!season) return;
    setLoading(true);

    Promise.all([
      fetch(`${API_BASE_URL}/standings/drivers?season=${season}`).then(res => res.json()),
      fetch(`${API_BASE_URL}/standings/constructors?season=${season}`).then(res => res.json()),
      fetch(`${API_BASE_URL}/schedule?season=${season}`).then(res => res.json())
    ])
      .then(([driversRes, constructorsRes, scheduleRes]) => {
        if (driversRes.success) {
          setDriverStandings(driversRes.data.standings);
        }
        if (constructorsRes.success) {
          setConstructorStandings(constructorsRes.data.standings);
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

  if (loading) {
    return <PageContainer style={{ padding: '2rem', color: 'white' }}>Loading...</PageContainer>;
  }

  // Calculate stats
  const finishedRaces = schedule?.races?.filter(r => r.status === 'FINISHED') || [];
  const totalRaces = finishedRaces.length;
  const totalPoints = driverStandings.reduce((sum, d) => sum + parseInt(d.points || 0), 0);
  const totalWins = driverStandings.reduce((sum, d) => sum + parseInt(d.wins || 0), 0);
  const uniqueWinners = driverStandings.filter(d => parseInt(d.wins || 0) > 0).length;

  // Max points for bar scaling
  const maxDriverPoints = Math.max(...driverStandings.map(d => parseInt(d.points || 0)));
  const maxConstructorPoints = Math.max(...constructorStandings.map(c => parseInt(c.points || 0)));

  // Top 4 teams with drivers
  const topTeams = constructorStandings.slice(0, 4).map(team => {
    const teamDrivers = driverStandings.filter(
      d => d.constructor?.constructorId === team.constructor?.constructorId
    );
    return { ...team, drivers: teamDrivers };
  });

  // Win distribution by team
  const winsByTeam = constructorStandings
    .filter(c => parseInt(c.wins || 0) > 0)
    .map(c => ({
      name: c.constructor?.nameKr,
      wins: parseInt(c.wins || 0),
      color: c.constructor?.color
    }));

  return (
    <PageContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <PageTitle>
          <BarChart2 size={28} color="#e10600" />
          {season} 시즌 분석
        </PageTitle>
        <SeasonSelector value={season} onChange={setSeason} />
      </div>

      {/* Season Overview Stats */}
      <StatsGrid>
        <StatCard $bg="rgba(225, 6, 0, 0.1)" $color="#e10600">
          <div className="icon"><Flag size={24} color="#e10600" /></div>
          <div className="value">{totalRaces}</div>
          <div className="label">완료된 레이스</div>
        </StatCard>
        <StatCard $bg="rgba(241, 196, 15, 0.1)" $color="#f1c40f">
          <div className="icon"><Trophy size={24} color="#f1c40f" /></div>
          <div className="value">{uniqueWinners}</div>
          <div className="label">우승 드라이버 수</div>
        </StatCard>
        <StatCard $bg="rgba(46, 204, 113, 0.1)" $color="#2ecc71">
          <div className="icon"><Zap size={24} color="#2ecc71" /></div>
          <div className="value">{totalPoints.toLocaleString()}</div>
          <div className="label">총 포인트</div>
        </StatCard>
        <StatCard $bg="rgba(52, 152, 219, 0.1)" $color="#3498db">
          <div className="icon"><Users size={24} color="#3498db" /></div>
          <div className="value">{driverStandings.length}</div>
          <div className="label">참가 드라이버</div>
        </StatCard>
      </StatsGrid>

      {/* Win Distribution */}
      {winsByTeam.length > 0 && (
        <Section>
          <SectionTitle><Trophy size={20} color="#f1c40f" /> 팀별 우승 분포</SectionTitle>
          <ChartContainer>
            <WinDistribution>
              {winsByTeam.map((team, idx) => (
                <WinSegment
                  key={idx}
                  style={{
                    width: `${(team.wins / totalWins) * 100}%`,
                    background: team.color
                  }}
                  title={`${team.name}: ${team.wins}승`}
                >
                  {team.wins >= 2 && `${team.name} ${team.wins}`}
                </WinSegment>
              ))}
            </WinDistribution>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
              {winsByTeam.map((team, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: team.color }} />
                  <span>{team.name}</span>
                  <strong>{team.wins}승</strong>
                </div>
              ))}
            </div>
          </ChartContainer>
        </Section>
      )}

      {/* Driver Championship */}
      <Section>
        <SectionTitle><Trophy size={20} /> 드라이버 챔피언십</SectionTitle>
        <ChartContainer>
          {driverStandings.slice(0, 10).map((entry) => (
            <BarRow key={entry.position} $rank={entry.position}>
              <div className="rank">{entry.position}</div>
              <div
                className="name"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/drivers/${entry.driver?.code}?season=${season}`)}
              >
                {entry.driver?.nameKr}
              </div>
              <div className="bar-container">
                <div
                  className="bar"
                  style={{
                    width: `${(parseInt(entry.points) / maxDriverPoints) * 100}%`,
                    background: entry.constructor?.color || '#e10600'
                  }}
                >
                  <span className="points">{entry.points}</span>
                </div>
              </div>
              <div className="wins">
                {parseInt(entry.wins) > 0 && <><span>{entry.wins}</span> 승</>}
              </div>
            </BarRow>
          ))}
        </ChartContainer>
      </Section>

      {/* Constructor Championship */}
      <Section>
        <SectionTitle><Users size={20} /> 컨스트럭터 챔피언십</SectionTitle>
        <ChartContainer>
          {constructorStandings.map((entry) => (
            <BarRow key={entry.position} $rank={entry.position}>
              <div className="rank">{entry.position}</div>
              <div
                className="name"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/teams/${entry.constructor?.constructorId}?season=${season}`)}
              >
                {entry.constructor?.nameKr}
              </div>
              <div className="bar-container">
                <div
                  className="bar"
                  style={{
                    width: `${(parseInt(entry.points) / maxConstructorPoints) * 100}%`,
                    background: entry.constructor?.color || '#e10600'
                  }}
                >
                  <span className="points">{entry.points}</span>
                </div>
              </div>
              <div className="wins">
                {parseInt(entry.wins) > 0 && <><span>{entry.wins}</span> 승</>}
              </div>
            </BarRow>
          ))}
        </ChartContainer>
      </Section>

      {/* Top Teams Comparison */}
      <Section>
        <SectionTitle><Zap size={20} /> 상위 팀 비교</SectionTitle>
        <TeamCompareGrid>
          {topTeams.map((team) => (
            <TeamCard
              key={team.position}
              $color={team.constructor?.color}
              onClick={() => navigate(`/teams/${team.constructor?.constructorId}?season=${season}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="header">
                <div className="team-name">{team.constructor?.nameKr}</div>
                <div className="team-rank">#{team.position}</div>
              </div>
              <div className="stats">
                <div className="stat-item">
                  <div className="value" style={{ color: team.constructor?.color }}>{team.points}</div>
                  <div className="label">포인트</div>
                </div>
                <div className="stat-item">
                  <div className="value" style={{ color: '#f1c40f' }}>{team.wins}</div>
                  <div className="label">우승</div>
                </div>
                <div className="stat-item">
                  <div className="value">{team.drivers?.length || 0}</div>
                  <div className="label">드라이버</div>
                </div>
              </div>
              {team.drivers && team.drivers.length > 0 && (
                <div className="drivers">
                  {team.drivers.map(d => (
                    <span key={d.driver?.code} className="driver-tag">
                      {d.driver?.nameKr} ({d.points}pts)
                    </span>
                  ))}
                </div>
              )}
            </TeamCard>
          ))}
        </TeamCompareGrid>
      </Section>
    </PageContainer>
  );
};

export default Stats;
