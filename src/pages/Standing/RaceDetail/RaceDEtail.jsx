import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowLeft, Clock, MapPin, Trophy, Flag, Zap, TrendingUp, TrendingDown, Users
} from 'lucide-react';
import { API_BASE_URL } from '../../../config';
import ShareButton from '../../../components/common/ShareButton/ShareButton';
import {
  Container, BackButton, Header, ResultTable
} from './style';

const Podium = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 12px;
  margin: 2rem 0;
  padding: 1.5rem;
  background: linear-gradient(180deg, rgba(225,6,0,0.1) 0%, transparent 100%);
  border-radius: 20px;

  @media (max-width: 768px) {
    gap: 8px;
    padding: 1rem;
  }
`;

const PodiumPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${props => props.$place === 1 ? '140px' : '120px'};

  .driver-info {
    text-align: center;
    margin-bottom: 12px;

    .name {
      font-weight: 700;
      font-size: ${props => props.$place === 1 ? '1.1rem' : '0.95rem'};
    }
    .team {
      font-size: 0.75rem;
      opacity: 0.7;
    }
  }

  .stand {
    width: 100%;
    background: ${props => {
      if (props.$place === 1) return 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)';
      if (props.$place === 2) return 'linear-gradient(180deg, #C0C0C0 0%, #A0A0A0 100%)';
      return 'linear-gradient(180deg, #CD7F32 0%, #8B4513 100%)';
    }};
    height: ${props => props.$place === 1 ? '100px' : props.$place === 2 ? '75px' : '55px'};
    border-radius: 8px 8px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 900;
    color: rgba(0,0,0,0.3);
  }

  @media (max-width: 768px) {
    width: ${props => props.$place === 1 ? '110px' : '90px'};

    .driver-info .name {
      font-size: ${props => props.$place === 1 ? '0.9rem' : '0.8rem'};
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
`;

const StatCard = styled.div`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 1.25rem;

  .label {
    font-size: 0.8rem;
    color: ${props => props.theme.subText};
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .value {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .sub {
    font-size: 0.85rem;
    color: ${props => props.theme.subText};
    margin-top: 4px;
  }
`;

const RaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const season = searchParams.get('season') || '2025';

  const [raceResult, setRaceResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/races/${id}/results?season=${season}`)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          setRaceResult(response.data);
        } else {
          setError(response.message || '경기 결과를 불러올 수 없습니다.');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, [id, season]);

  if (loading) return <Container style={{padding:'2rem', color:'white'}}>Loading...</Container>;

  if (error || !raceResult) {
    return (
      <Container>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> 뒤로 가기
        </BackButton>
        <h3 style={{color:'white', marginTop:'2rem'}}>{error || '경기 결과를 찾을 수 없습니다.'}</h3>
      </Container>
    );
  }

  const top3 = raceResult.results.slice(0, 3);
  const fastestLapDriver = raceResult.results.find(r => r.fastestLap);
  const finishers = raceResult.results.filter(r => !r.time?.includes('DNF') && !r.time?.includes('DNS'));

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <BackButton onClick={() => navigate(-1)} style={{ marginBottom: 0 }}>
          <ArrowLeft size={18} /> 목록으로
        </BackButton>
        <ShareButton
          title={`${raceResult.raceNameKr} 결과 - RACE.GG`}
          text={`${raceResult.raceNameKr} 레이스 결과를 확인하세요!`}
        />
      </div>

      {/* 1. 헤더: 경기 이름 */}
      <Header>
        <div className="round-badge">ROUND {raceResult.round}</div>
        <h1>{raceResult.countryFlag} {raceResult.raceNameKr}</h1>
        <div className="meta">
          <span><Clock size={16}/> {raceResult.date}</span>
          <span><MapPin size={16}/> {raceResult.circuitKr}</span>
        </div>
      </Header>

      {/* 2. 포디움 */}
      {top3.length === 3 && (
        <Podium>
          <PodiumPlace $place={2}>
            <div className="driver-info">
              <div className="name">{top3[1].nameKr}</div>
              <div className="team" style={{ color: top3[1].teamColor }}>{top3[1].team}</div>
            </div>
            <div className="stand">2</div>
          </PodiumPlace>
          <PodiumPlace $place={1}>
            <Trophy size={28} color="#FFD700" style={{ marginBottom: '8px' }} />
            <div className="driver-info">
              <div className="name">{top3[0].nameKr}</div>
              <div className="team" style={{ color: top3[0].teamColor }}>{top3[0].team}</div>
            </div>
            <div className="stand">1</div>
          </PodiumPlace>
          <PodiumPlace $place={3}>
            <div className="driver-info">
              <div className="name">{top3[2].nameKr}</div>
              <div className="team" style={{ color: top3[2].teamColor }}>{top3[2].team}</div>
            </div>
            <div className="stand">3</div>
          </PodiumPlace>
        </Podium>
      )}

      {/* 3. 레이스 통계 */}
      <StatsGrid>
        <StatCard>
          <div className="label"><Trophy size={14} /> 우승</div>
          <div className="value" style={{ color: top3[0]?.teamColor }}>{top3[0]?.nameKr}</div>
          <div className="sub">{top3[0]?.time}</div>
        </StatCard>
        {fastestLapDriver && (
          <StatCard>
            <div className="label"><Zap size={14} color="#9C27B0" /> 패스티스트 랩</div>
            <div className="value">{fastestLapDriver.nameKr}</div>
            <div className="sub">{fastestLapDriver.team}</div>
          </StatCard>
        )}
        <StatCard>
          <div className="label"><Users size={14} /> 완주</div>
          <div className="value">{finishers.length} / {raceResult.results.length}</div>
          <div className="sub">드라이버</div>
        </StatCard>
      </StatsGrid>

      {/* 2. 경기 결과 테이블 */}
      <h3 style={{ marginTop: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Trophy size={20} color="#e10600"/> FINAL CLASSIFICATION
      </h3>

      <ResultTable>
        <thead>
          <tr>
            <th>POS</th>
            <th>DRIVER</th>
            <th>TEAM</th>
            <th>GRID</th>
            <th>TIME/GAP</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {raceResult.results.map((row) => (
            <tr key={row.position} className={row.position <= 3 ? `top-${row.position}` : ''}>
              <td className="pos">
                {row.position === 1 && <Trophy size={14} color="#FFD700" />}
                {row.position}
              </td>
              <td className="driver">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: '600' }}>{row.nameKr}</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{row.code}</span>
                </div>
                {row.fastestLap && (
                  <Zap size={14} color="#9C27B0" fill="#9C27B0" style={{ marginLeft: '8px' }} title="Fastest Lap" />
                )}
              </td>
              <td className="team" style={{ color: row.teamColor }}>{row.team}</td>
              <td className="grid">
                {row.grid > 0 ? row.grid : 'PIT'}
                {row.position < row.grid && row.grid > 0 && (
                  <span style={{ color: '#2ecc71', marginLeft: '4px', fontSize: '0.75rem' }}>
                    +{row.grid - row.position}
                  </span>
                )}
                {row.position > row.grid && row.grid > 0 && (
                  <span style={{ color: '#e74c3c', marginLeft: '4px', fontSize: '0.75rem' }}>
                    -{row.position - row.grid}
                  </span>
                )}
              </td>
              <td>{row.time}</td>
              <td className="pts">
                {parseFloat(row.points) > 0 ? `+${row.points}` : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </ResultTable>

      {/* 범례 */}
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem', fontSize: '0.8rem', opacity: 0.7 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Zap size={12} color="#9C27B0" fill="#9C27B0" /> Fastest Lap
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#2ecc71' }}>+N</span> 순위 상승
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#e74c3c' }}>-N</span> 순위 하락
        </span>
      </div>
    </Container>
  );
};

export default RaceDetail;
