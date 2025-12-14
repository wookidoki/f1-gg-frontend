import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Trophy, Flag, Calendar, Activity, ArrowLeft, BarChart2 
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer 
} from 'recharts';

import { 
  DetailContainer, BackButton, ProfileHeader, ProfileInfo, 
  BigNumber, NameSection, StatGrid, StatBox, 
  ContentSection, ChartContainer, SectionTitle 
} from './stlye';

const DriverDetail = () => {
  const { id } = useParams(); // URL의 id 부분 (예: /drivers/1)
  const navigate = useNavigate();

  // 실제로는 API로 id에 해당하는 데이터를 불러와야 함. 지금은 Mock Data.
  // "게임 능력치" 느낌의 데이터 (5점 만점 or 100점 만점)
  const driverData = {
    id: 1,
    name: "Max Verstappen",
    team: "Red Bull Racing",
    number: 1,
    country: "Netherlands",
    birth: "1997.09.30",
    color: "#0600EF",
    stats: {
      championships: 3,
      wins: 62,
      podiums: 111,
      points: 2986.5
    },
    // 육각형 능력치 데이터 (FIFA 게임 스타일)
    ability: [
      { subject: '속도 (Pace)', A: 98, fullMark: 100 },
      { subject: '경험 (Exp)', A: 90, fullMark: 100 },
      { subject: '공격성 (Agg)', A: 95, fullMark: 100 },
      { subject: '방어 (Def)', A: 92, fullMark: 100 },
      { subject: '타이어 관리', A: 88, fullMark: 100 },
      { subject: '안정성', A: 96, fullMark: 100 },
    ]
  };

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> 뒤로가기
      </BackButton>

      {/* 1. 프로필 헤더 섹션 */}
      <ProfileHeader $teamColor={driverData.color}>
        <BigNumber>{driverData.number}</BigNumber>
        <ProfileInfo>
          <NameSection>
            <h3>{driverData.team}</h3>
            <h1>{driverData.name}</h1>
          </NameSection>
          
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <span><Flag size={16} /> 네덜란드</span>
            <span><Calendar size={16} /> {driverData.birth}</span>
          </div>
        </ProfileInfo>
      </ProfileHeader>

      {/* 2. 핵심 스탯 그리드 (우승, 포디움 등) */}
      <StatGrid>
        <StatBox>
          <Trophy size={24} color="#FFD700" />
          <div>
            <span>월드 챔피언</span>
            <strong>{driverData.stats.championships}회</strong>
          </div>
        </StatBox>
        <StatBox>
          <Flag size={24} color={driverData.color} />
          <div>
            <span>그랑프리 우승</span>
            <strong>{driverData.stats.wins}회</strong>
          </div>
        </StatBox>
        <StatBox>
          <Activity size={24} color="#2ecc71" />
          <div>
            <span>포디움</span>
            <strong>{driverData.stats.podiums}회</strong>
          </div>
        </StatBox>
        <StatBox>
          <BarChart2 size={24} color="#e10600" />
          <div>
            <span>통산 포인트</span>
            <strong>{driverData.stats.points}</strong>
          </div>
        </StatBox>
      </StatGrid>

      {/* 3. 상세 분석 섹션 (차트 포함) */}
      <ContentSection>
        <div className="chart-area">
          <SectionTitle>
            <Activity size={20} /> 드라이버 능력치 분석
          </SectionTitle>
          <p style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '1rem' }}>
            최근 5경기 데이터 및 시즌 퍼포먼스 기반 AI 분석
          </p>
          
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={driverData.ability}>
                <PolarGrid stroke="#444" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ccc', fontSize: 12 }} />
                <Radar
                  name={driverData.name}
                  dataKey="A"
                  stroke={driverData.color}
                  strokeWidth={3}
                  fill={driverData.color}
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="text-area">
          <SectionTitle>
            <Trophy size={20} /> 2024 시즌 코멘트
          </SectionTitle>
          <div style={{ lineHeight: '1.6', color: '#ddd' }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>"압도적인 지배자"</strong> <br/>
              막스 베르스타펜은 이번 시즌에도 RB20의 성능을 극한으로 끌어내며 챔피언십 선두를 달리고 있습니다. 특히 타이어 관리 능력과 예선전에서의 폭발적인 스피드는 타의 추종을 불허합니다.
            </p>
            <p>
              초반 5경기 중 4경기에서 우승을 차지하며 4연속 월드 챔피언을 향해 순항 중입니다. 비록 최근 맥라렌의 추격이 거세지만, 그의 방어 능력은 여전히 최고 수준으로 평가받습니다.
            </p>
          </div>
        </div>
      </ContentSection>
    </DetailContainer>
  );
};

export default DriverDetail;