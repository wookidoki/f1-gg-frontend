import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, Trophy, MapPin, Users, Zap, Calendar
} from 'lucide-react';
import { API_BASE_URL, getFlagEmoji } from '../../../config';

import {
  DetailContainer, BackButton, HeroSection, TeamLogoLarge,
  InfoGrid, InfoCard, SectionTitle, DriverLinkBox
} from './style';

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const season = searchParams.get('season') || '2025';

  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/constructors/${id}?season=${season}`)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          setTeamData(response.data);
        } else {
          setError(response.message || '팀 정보를 불러올 수 없습니다.');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, [id, season]);

  if (loading) return <DetailContainer style={{padding:'2rem', color:'white'}}>Loading...</DetailContainer>;

  if (error || !teamData) {
    return (
      <DetailContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> 뒤로 가기
        </BackButton>
        <h3 style={{color:'white', marginTop:'2rem'}}>{error || '팀을 찾을 수 없습니다.'}</h3>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> 전체 목록으로
      </BackButton>

      {/* 1. 히어로 섹션 (팀 아이덴티티) */}
      <HeroSection $color={teamData.color}>
        <div style={{ zIndex: 2 }}>
          <h2 style={{ opacity: 0.8, fontWeight: 600 }}>{season} F1 CONSTRUCTOR</h2>
          <h1 style={{ fontSize: '3rem', fontStyle: 'italic', fontWeight: 900, margin: '10px 0' }}>
            {teamData.nameKr}
          </h1>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9 }}>
            {getFlagEmoji(teamData.nationality)} {teamData.name}
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
            <strong>{teamData.careerStats?.championships || 0}회</strong>
          </div>
        </InfoCard>
        <InfoCard>
          <Zap size={24} color={teamData.color} />
          <div>
            <span>그랑프리 우승 (통산)</span>
            <strong>{teamData.careerStats?.wins || 0}회</strong>
          </div>
        </InfoCard>
        <InfoCard>
          <Calendar size={24} />
          <div>
            <span>F1 참가 시즌</span>
            <strong>{teamData.careerStats?.seasons || 0}시즌</strong>
          </div>
        </InfoCard>
      </InfoGrid>

      {/* 3. 현재 시즌 성적 */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <SectionTitle><Trophy size={20} color="#e10600" /> {season} 시즌 성적</SectionTitle>
        <div style={{ display: 'flex', gap: '3rem', marginTop: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>순위</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>{teamData.currentRank}위</div>
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>포인트</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#e10600' }}>{teamData.currentPoints}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>시즌 우승</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: teamData.currentWins > 0 ? '#f1c40f' : 'inherit' }}>
              {teamData.currentWins > 0 ? teamData.currentWins : '-'}
            </div>
          </div>
        </div>
      </div>

      {/* 4. 소속 드라이버 */}
      {teamData.drivers && teamData.drivers.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <SectionTitle style={{ marginBottom: '1rem' }}><Users size={20} /> 소속 드라이버</SectionTitle>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {teamData.drivers.map((driver) => (
              <DriverLinkBox
                key={driver.code}
                onClick={() => navigate(`/drivers/${driver.code}?season=${season}`)}
              >
                {getFlagEmoji(driver.nationality)}
                <span>{driver.nameKr}</span>
                <strong>#{driver.number}</strong>
                <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>P{driver.rank} • {driver.points}pts</span>
              </DriverLinkBox>
            ))}
          </div>
        </div>
      )}

      {/* 5. 시즌 결과 */}
      {teamData.seasonResults && teamData.seasonResults.length > 0 && (
        <div>
          <SectionTitle style={{ marginBottom: '1rem' }}><Calendar size={20} /> {season} 시즌 결과</SectionTitle>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {teamData.seasonResults.map((race) => (
              <div
                key={race.round}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  background: parseInt(race.points) >= 20 ? 'rgba(241, 196, 15, 0.1)' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', opacity: 0.5, width: '40px' }}>R{race.round}</span>
                  <div>
                    <div style={{ fontWeight: '600' }}>{race.raceNameKr}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{race.date}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  {/* 드라이버별 결과 */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {race.driverResults.map(dr => (
                      <span
                        key={dr.code}
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}
                      >
                        {dr.code} P{dr.position}
                      </span>
                    ))}
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    +{race.points} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DetailContainer>
  );
};

export default TeamDetail;
