import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Trophy, MapPin, Users, Wrench, BarChart2, Zap 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

import { 
  DetailContainer, BackButton, HeroSection, TeamLogoLarge, 
  InfoGrid, InfoCard, TechSpecSection, SpecItem, 
  ChartSection, SectionTitle, DriverLinkBox
} from './style';

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Data: 레드불 레이싱 예시
  const teamData = {
    id: 1,
    name: "Red Bull Racing",
    fullName: "Oracle Red Bull Racing",
    base: "Milton Keynes, United Kingdom",
    principal: "Christian Horner",
    powerUnit: "Honda RBPTH002",
    chassis: "RB20",
    color: "#0600EF",
    stats: {
      titles: 6,
      wins: 113,
      poles: 98,
      fastestLaps: 95
    },
    drivers: [
      { name: "Max Verstappen", number: 1 },
      { name: "Sergio Perez", number: 11 }
    ],
    // 최근 5년 포인트 추이
    history: [
      { year: '2019', points: 417 },
      { year: '2020', points: 319 },
      { year: '2021', points: 585.5 },
      { year: '2022', points: 759 },
      { year: '2023', points: 860 },
    ]
  };

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> 전체 목록으로
      </BackButton>

      {/* 1. 히어로 섹션 (팀 아이덴티티) */}
      <HeroSection $color={teamData.color}>
        <div style={{ zIndex: 2 }}>
          <h2 style={{ opacity: 0.8, fontWeight: 600 }}>F1 CONSTRUCTOR</h2>
          <h1 style={{ fontSize: '3rem', fontStyle: 'italic', fontWeight: 900, margin: '10px 0' }}>
            {teamData.name}
          </h1>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9 }}>
            <MapPin size={18} /> {teamData.base}
          </p>
        </div>
        <TeamLogoLarge>{teamData.name[0]}</TeamLogoLarge>
      </HeroSection>

      {/* 2. 핵심 통계 (역대 기록) */}
      <InfoGrid>
        <InfoCard>
          <Trophy size={24} color="#FFD700" />
          <div>
            <span>컨스트럭터 챔피언</span>
            <strong>{teamData.stats.titles}회</strong>
          </div>
        </InfoCard>
        <InfoCard>
          <Zap size={24} color={teamData.color} />
          <div>
            <span>그랑프리 우승</span>
            <strong>{teamData.stats.wins}회</strong>
          </div>
        </InfoCard>
        <InfoCard>
          <BarChart2 size={24} />
          <div>
            <span>폴 포지션</span>
            <strong>{teamData.stats.poles}회</strong>
          </div>
        </InfoCard>
      </InfoGrid>

      {/* 3. 머신(차량) 테크니컬 스펙 */}
      <TechSpecSection>
        <SectionTitle><Wrench size={22} /> 2024 MACHINE TECH SPEC</SectionTitle>
        <div className="spec-grid">
          <SpecItem>
            <span className="label">CHASSIS</span>
            <span className="value">{teamData.chassis}</span>
          </SpecItem>
          <SpecItem>
            <span className="label">POWER UNIT</span>
            <span className="value">{teamData.powerUnit}</span>
          </SpecItem>
          <SpecItem>
            <span className="label">TEAM PRINCIPAL</span>
            <span className="value">{teamData.principal}</span>
          </SpecItem>
        </div>
      </TechSpecSection>

      {/* 4. 시즌 포인트 추이 차트 */}
      <ChartSection>
        <SectionTitle><BarChart2 size={22} /> 최근 5년 포인트 퍼포먼스</SectionTitle>
        <div style={{ width: '100%', height: '300px', marginTop: '1rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={teamData.history}>
              <defs>
                <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={teamData.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={teamData.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
              <XAxis dataKey="year" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: '#888'}} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="points" 
                stroke={teamData.color} 
                fillOpacity={1} 
                fill="url(#colorPoints)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartSection>
      
      {/* 5. 소속 드라이버 링크 (간단하게) */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        {teamData.drivers.map((driver) => (
          <DriverLinkBox key={driver.number} onClick={() => navigate('/drivers')}>
            <Users size={16} /> 
            <span>{driver.name}</span>
            <strong>#{driver.number}</strong>
          </DriverLinkBox>
        ))}
      </div>

    </DetailContainer>
  );
};

export default TeamDetail;