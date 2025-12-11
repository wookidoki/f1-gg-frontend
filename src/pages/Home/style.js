import styled from 'styled-components';

export const HomeContainer = styled.div`
  width: 100%;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// 1. 메인 배너 (다음 경기 정보)
export const HeroBanner = styled.div`
  width: 100%;
  padding: 2.5rem;
  border-radius: 24px;
  background: linear-gradient(135deg, #e10600 0%, #ff4d4d 100%);
  color: white;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 10px 20px rgba(225, 6, 0, 0.3);
  
  /* 배경 장식 */
  &::after {
    content: 'F1';
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 10rem;
    font-weight: 900;
    font-style: italic;
    opacity: 0.1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const DDayBadge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 800;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 1rem;
  display: inline-block;
`;

export const RaceTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  font-style: italic;
  margin-bottom: 0.5rem;
  line-height: 1.1;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const RaceInfo = styled.div`
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 2. 섹션 타이틀
export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${(props) => props.theme.text};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    color: ${(props) => props.theme.colors.primary};
  }
`;

// 3. 카드 그리드 레이아웃
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// 4. 드라이버 카드
export const DriverCard = styled.div`
  background-color: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 20px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0,0,0,0.05);
  }

  /* 팀 컬러 바 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: linear-gradient(to bottom, ${(props) => props.$colorStart}, ${(props) => props.$colorEnd});
  }
`;

export const RankBadge = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.theme.bg};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-style: italic;
  font-size: 1.1rem;
  color: ${(props) => props.theme.text};
  margin-bottom: 0.5rem;
`;