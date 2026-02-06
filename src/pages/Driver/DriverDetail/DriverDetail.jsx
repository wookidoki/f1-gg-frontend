import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Trophy, Zap, ArrowLeft, Crown, Calendar, Flag, Hash
} from 'lucide-react';
import { getFlagEmoji } from '../../../config';

import { useDriverDetail } from './useDriverDetail';
import {
  DetailContainer, BackButton, ProfileHeader, ProfileInfo,
  BigNumber, NameSection, StatGrid, StatBox,
  ContentSection, SectionTitle
} from './style';

const DriverDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const { driver, loading, error } = useDriverDetail(code);

  if (loading) return <DetailContainer style={{padding:'2rem', color:'white'}}>Loading...</DetailContainer>;

  if (error || !driver) return (
    <DetailContainer>
      <h3 style={{color:'white'}}>{error || "Driver Not Found"}</h3>
      <BackButton onClick={() => navigate(-1)}>뒤로 가기</BackButton>
    </DetailContainer>
  );

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> 전체 목록
      </BackButton>

      <ProfileHeader $teamColor={driver.teamColor}>
        <BigNumber>{driver.number}</BigNumber>
        <ProfileInfo>
          <NameSection>
            <h3 style={{ color: driver.teamColor }}>{driver.team}</h3>
            <h1>{driver.nameKr}</h1>
            <p style={{ opacity: 0.7, marginTop: '4px' }}>{driver.nameEn}</p>
          </NameSection>

          <div style={{ marginTop: '25px', display: 'flex', gap: '40px', alignItems: 'center' }}>

            {/* 현재 순위 */}
            <div>
              <div style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '4px', textTransform:'uppercase' }}>Rank</div>
              <div style={{ fontSize: '2.8rem', fontWeight: '900', lineHeight: 0.9, display:'flex', alignItems:'center', gap:'10px' }}>
                {driver.currentRank}
                {driver.currentRank === 1 && <Crown size={28} color="#f1c40f" fill="#f1c40f" />}
              </div>
            </div>

            {/* 포인트 */}
            <div style={{ paddingLeft: '30px', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Points</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700' }}>
                {driver.currentPoints} <small style={{fontSize:'0.9rem'}}>PTS</small>
              </div>
            </div>

            {/* 시즌 우승 */}
            <div style={{ paddingLeft: '30px', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Wins</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: driver.currentWins > 0 ? '#f1c40f' : 'inherit' }}>
                {driver.currentWins > 0 ? driver.currentWins : '-'}
              </div>
            </div>

          </div>
        </ProfileInfo>
      </ProfileHeader>

      {/* 기본 정보 */}
      <StatGrid>
        <StatBox>
          <Flag size={24} color="#3498db" />
          <div><span>국적</span><strong>{getFlagEmoji(driver.nationality)} {driver.nationality}</strong></div>
        </StatBox>
        <StatBox>
          <Calendar size={24} color="#9b59b6" />
          <div><span>생년월일</span><strong>{driver.dob}</strong></div>
        </StatBox>
        <StatBox>
          <Hash size={24} color="#e74c3c" />
          <div><span>카넘버</span><strong>#{driver.number}</strong></div>
        </StatBox>
        <StatBox>
          <Zap size={24} color={driver.teamColor} />
          <div><span>코드</span><strong>{driver.code}</strong></div>
        </StatBox>
      </StatGrid>

      {/* 커리어 통계 */}
      {driver.careerStats && (
        <ContentSection>
          <SectionTitle><Trophy size={20}/> 커리어 통계</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#f1c40f' }}>{driver.careerStats.championships}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '4px' }}>월드 챔피언</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#e74c3c' }}>{driver.careerStats.wins}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '4px' }}>총 우승</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#3498db' }}>{driver.careerStats.seasons}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '4px' }}>시즌 참가</div>
            </div>
          </div>
        </ContentSection>
      )}

      {/* 시즌 결과 */}
      {driver.seasonResults && driver.seasonResults.length > 0 && (
        <ContentSection>
          <SectionTitle><Calendar size={20}/> 2024 시즌 결과</SectionTitle>
          <div style={{ marginTop: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
            {driver.seasonResults.map((race) => (
              <div
                key={race.round}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  background: race.position === 1 ? 'rgba(241, 196, 15, 0.1)' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    fontSize: '0.85rem',
                    opacity: 0.5,
                    width: '40px'
                  }}>R{race.round}</span>
                  <div>
                    <div style={{ fontWeight: '600' }}>{race.raceNameKr}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{race.date}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '900',
                      color: race.position === 1 ? '#f1c40f' : race.position <= 3 ? '#2ecc71' : 'inherit'
                    }}>
                      P{race.position}
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem'
                  }}>
                    +{race.points} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContentSection>
      )}
    </DetailContainer>
  );
};

export default DriverDetail;
