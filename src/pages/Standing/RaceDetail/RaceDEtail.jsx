import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, Clock, MapPin, Trophy, Flag, Zap
} from 'lucide-react';
import { API_BASE_URL } from '../../../config';
import {
  Container, BackButton, Header, ResultTable
} from './style';

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

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> 목록으로 돌아가기
      </BackButton>

      {/* 1. 헤더: 경기 이름 */}
      <Header>
        <div className="round-badge">ROUND {raceResult.round}</div>
        <h1>{raceResult.countryFlag} {raceResult.raceNameKr}</h1>
        <div className="meta">
          <span><Clock size={16}/> {raceResult.date}</span>
          <span><MapPin size={16}/> {raceResult.circuitKr}</span>
        </div>
      </Header>

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
