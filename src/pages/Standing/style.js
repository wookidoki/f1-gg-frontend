import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${(props) => props.theme.subText};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 1px;
`;

// 1. 컨스트럭터 랭킹 섹션
export const TopRankSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const RankCard = styled.div`
  background: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.theme.border};
  border-left: 4px solid ${(props) => props.$color};
  padding: 1rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;

  .rank {
    font-size: 1.5rem;
    font-weight: 900;
    font-style: italic;
    color: ${(props) => props.$color};
  }
  
  .info h3 { font-size: 1rem; font-weight: 700; }
  .info p { font-size: 0.9rem; color: ${(props) => props.theme.subText}; }
`;

// 2. 가장 최근 경기 (Hero Card)
export const HeroRaceCard = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.border};
  transition: transform 0.2s;

  &:hover { transform: translateY(-3px); }

  /* 배경 그라데이션 (나중엔 서킷 이미지 넣으면 좋음) */
  .bg-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(135deg, #1a1a1a 0%, #000 100%);
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0; right: 0; width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent 0%, ${(props) => props.theme.colors.primary} 100%);
    opacity: 0.1;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 2.5rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .race-info {
    color: white;
    .round { font-size: 0.8rem; font-weight: 700; opacity: 0.7; display: block; margin-bottom: 0.5rem; }
    h1 { font-size: 2.5rem; font-weight: 900; font-style: italic; margin-bottom: 0.5rem; }
    .circuit { font-size: 0.95rem; opacity: 0.8; display: flex; align-items: center; gap: 6px; }
  }

  .winner-info {
    text-align: right;
    @media (max-width: 768px) { text-align: left; }
    
    .label { font-size: 0.8rem; font-weight: 700; color: ${(props) => props.theme.colors.primary}; letter-spacing: 2px; }
  }
`;

export const WinnerBadge = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;

  .driver { display: block; font-size: 1.2rem; font-weight: 800; color: white; }
  .team { font-size: 0.8rem; color: #ccc; }
`;

// 3. 경기 리스트
export const RaceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const RaceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.theme.border};
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  cursor: ${(props) => props.$isUpcoming ? 'default' : 'pointer'};
  opacity: ${(props) => props.$isUpcoming ? 0.7 : 1};
  transition: all 0.2s;

  &:hover {
    background: ${(props) => !props.$isUpcoming && props.theme.bg};
    border-color: ${(props) => !props.$isUpcoming && props.theme.colors.primary};
  }

  .left {
    display: flex;
    align-items: center;
    gap: 1rem;
    .round { font-size: 0.8rem; font-weight: 700; color: ${(props) => props.theme.subText}; width: 30px; }
    .date { font-size: 0.9rem; font-weight: 600; width: 50px; }
    .flag { font-size: 1.5rem; }
    .name { font-weight: 700; font-size: 1rem; }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 1rem;
    .winner-label { font-size: 0.75rem; color: ${(props) => props.theme.subText}; }
    .winner-name { font-weight: 700; color: ${(props) => props.theme.text}; }
  }

  @media (max-width: 600px) {
    .left .name { font-size: 0.9rem; }
    .right .winner-label { display: none; }
  }
`;

export const StatusBadge = styled.span`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
`;