import styled from 'styled-components';

export const DetailContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem 1rem;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.subText};
  margin-bottom: 2rem;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

// 1. 프로필 헤더 (팀 컬러 그라데이션)
export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 3rem;
  background: linear-gradient(135deg, ${(props) => props.$teamColor}22 0%, rgba(0,0,0,0) 100%);
  border: 1px solid ${(props) => props.$teamColor}44;
  border-radius: 24px;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  /* 배경 장식 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    background: ${(props) => props.$teamColor};
    opacity: 0.1;
    transform: skewX(-20deg) translateX(100px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }
`;

export const BigNumber = styled.div`
  font-size: 6rem;
  font-weight: 900;
  font-style: italic;
  color: ${(props) => props.theme.text};
  line-height: 1;
  text-shadow: 0 0 30px rgba(255,255,255,0.2);
`;

export const ProfileInfo = styled.div`
  z-index: 1;
`;

export const NameSection = styled.div`
  h3 {
    font-size: 1.2rem;
    color: ${(props) => props.theme.subText};
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  h1 {
    font-size: 3rem;
    font-weight: 900;
    font-style: italic;
    line-height: 1.1;
  }
`;

// 2. 스탯 그리드
export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatBox = styled.div`
  background-color: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.theme.border};
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.subText};
    font-weight: 600;
  }

  strong {
    font-size: 1.4rem;
    font-weight: 800;
    font-style: italic;
  }
`;

// 3. 차트 및 텍스트 섹션
export const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  .chart-area, .text-area {
    background-color: ${(props) => props.theme.cardBg};
    border: 1px solid ${(props) => props.theme.border};
    border-radius: 20px;
    padding: 2rem;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    color: ${(props) => props.theme.colors.primary};
  }
`;