import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, MapPin, Trophy, Flag, Timer, Ruler, RotateCw 
} from 'lucide-react';
import { 
  Container, BackButton, Header, TrackSection, TrackMap, 
  TrackStats, StatCard, ResultTable 
} from './style';

const RaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Data: 경기 및 서킷 상세 정보
  const raceResult = {
    name: "Belgian Grand Prix",
    round: 14,
    circuit: "Circuit de Spa-Francorchamps",
    date: "2024.07.28",
    // 새로 추가된 서킷 정보
    circuitInfo: {
      mapImage: "/assets/tracks/spa.png", // 실제 이미지가 들어갈 경로
      length: "7.004 km",
      laps: 44,
      distance: "308.052 km",
      record: "1:41.252",
      recordHolder: "L. Hamilton (2020)",
      corners: 19,
      drsZones: 2
    },
    standings: [
      { pos: 1, driver: "Lewis Hamilton", team: "Mercedes", time: "1:19:57.040", pts: 25 },
      { pos: 2, driver: "Oscar Piastri", team: "McLaren", time: "+0.647s", pts: 18 },
      { pos: 3, driver: "Charles Leclerc", team: "Ferrari", time: "+8.023s", pts: 15 },
      { pos: 4, driver: "Max Verstappen", team: "Red Bull Racing", time: "+8.700s", pts: 12 },
      { pos: 5, driver: "Lando Norris", team: "McLaren", time: "+9.324s", pts: 10 },
      { pos: 6, driver: "Carlos Sainz", team: "Ferrari", time: "+19.269s", pts: 8 },
      { pos: 7, driver: "Sergio Perez", team: "Red Bull Racing", time: "+42.669s", pts: 6 },
      { pos: 8, driver: "Fernando Alonso", team: "Aston Martin", time: "+49.437s", pts: 4 },
    ]
  };

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> 목록으로 돌아가기
      </BackButton>

      {/* 1. 헤더: 경기 이름 */}
      <Header>
        <div className="round-badge">ROUND {raceResult.round}</div>
        <h1>{raceResult.name}</h1>
        <div className="meta">
          <span><Clock size={16}/> {raceResult.date}</span>
          <span><MapPin size={16}/> {raceResult.circuit}</span>
        </div>
      </Header>

      {/* 2. (NEW) 트랙 정보 섹션 */}
      <TrackSection>
        {/* 왼쪽: 트랙 지도 (이미지) */}
        <TrackMap>
          <div className="map-placeholder">
             {/* 실제 구현 시: <img src={raceResult.circuitInfo.mapImage} alt="Track Map" /> */}
             <span className="track-shape-mock">🏁 Track Layout Image</span>
             <p>Circuit de Spa-Francorchamps</p>
          </div>
        </TrackMap>

        {/* 오른쪽: 트랙 스펙 통계 */}
        <TrackStats>
          <StatCard>
            <div className="icon"><Ruler size={20} /></div>
            <div>
              <span className="label">CIRCUIT LENGTH</span>
              <strong>{raceResult.circuitInfo.length}</strong>
            </div>
          </StatCard>
          <StatCard>
            <div className="icon"><RotateCw size={20} /></div>
            <div>
              <span className="label">LAPS</span>
              <strong>{raceResult.circuitInfo.laps}</strong>
            </div>
          </StatCard>
          <StatCard>
            <div className="icon"><Flag size={20} /></div>
            <div>
              <span className="label">RACE DISTANCE</span>
              <strong>{raceResult.circuitInfo.distance}</strong>
            </div>
          </StatCard>
          <StatCard>
            <div className="icon"><Timer size={20} /></div>
            <div>
              <span className="label">LAP RECORD</span>
              <strong>{raceResult.circuitInfo.record}</strong>
              <small>{raceResult.circuitInfo.recordHolder}</small>
            </div>
          </StatCard>
        </TrackStats>
      </TrackSection>

      {/* 3. 경기 결과 테이블 */}
      <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Trophy size={20} color="#e10600"/> FINAL CLASSIFICATION
      </h3>
      
      <ResultTable>
        <thead>
          <tr>
            <th>POS</th>
            <th>DRIVER</th>
            <th>TEAM</th>
            <th>TIME/GAP</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {raceResult.standings.map((row) => (
            <tr key={row.pos} className={row.pos <= 3 ? `top-${row.pos}` : ''}>
              <td className="pos">
                {row.pos === 1 && <Trophy size={14} color="#FFD700" />}
                {row.pos}
              </td>
              <td className="driver">{row.driver}</td>
              <td className="team">{row.team}</td>
              <td>{row.time}</td>
              <td className="pts">+{row.pts}</td>
            </tr>
          ))}
        </tbody>
      </ResultTable>
    </Container>
  );
};

export default RaceDetail;