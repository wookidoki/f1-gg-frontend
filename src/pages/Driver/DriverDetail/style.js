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
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

// 1. 프로필 헤더: 전문성 강화를 위한 텍스트 계층 수정
export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  padding: 3rem;
  background: linear-gradient(135deg, ${(props) => props.$teamColor}22 0%, rgba(0,0,0,0) 100%);
  border: 1px solid ${(props) => props.$teamColor}44;
  border-radius: 24px;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 250px;
    height: 100%;
    background: ${(props) => props.$teamColor};
    opacity: 0.05;
    transform: skewX(-20deg) translateX(120px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }
`;

export const BigNumber = styled.div`
  font-size: 6.5rem;
  font-weight: 900;
  font-style: italic;
  color: ${(props) => props.theme.text};
  line-height: 0.8;
  opacity: 0.9;
  text-shadow: 0 0 40px rgba(255,255,255,0.1);
  letter-spacing: -4px;
`;

export const ProfileInfo = styled.div`
  z-index: 1;

  .meta-tags {
    display: flex;
    gap: 12px;
    margin-top: 15px;
    
    .tag {
      font-size: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      padding: 4px 10px;
      border-radius: 4px;
      color: ${(props) => props.theme.subText};
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;

export const NameSection = styled.div`
  h3 {
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: ${(props) => props.theme.subText};
    font-weight: 600;
    margin-bottom: 0.3rem;
  }
  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    font-style: italic;
    line-height: 1;
    
    small {
      display: block;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      opacity: 0.5;
      margin-top: 8px;
      letter-spacing: 0;
    }
  }
`;

// 2. 스탯 그리드: 데이터 가독성 및 호버 효과 추가
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
  gap: 1.2rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: ${(props) => props.theme.colors.primary}66;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  span {
    font-size: 0.75rem;
    color: ${(props) => props.theme.subText};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  strong {
    font-size: 1.6rem;
    font-weight: 900;
    font-style: italic;
    color: ${(props) => props.theme.text};

    small {
      font-size: 0.8rem;
      font-weight: 500;
      font-style: normal;
      margin-left: 4px;
      opacity: 0.6;
    }
  }
`;

// 3. 차트 및 텍스트 섹션: 레이아웃 균형 조정
export const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr; /* 차트 영역을 조금 더 넓게 */
  gap: 1.5rem;

  .chart-area, .text-area {
    background-color: ${(props) => props.theme.cardBg};
    border: 1px solid ${(props) => props.theme.border};
    border-radius: 24px;
    padding: 2rem;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 350px;
  margin-top: 1.5rem;
  position: relative;
  
  /* 차트 배경에 미세한 톤 추가 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.02);
    border-radius: 12px;
    pointer-events: none;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.theme.text};
  
  svg {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const CommentBox = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px dashed rgba(255, 255, 255, 0.1);

  p {
    line-height: 1.7;
    color: ${(props) => props.theme.subText};
    font-size: 0.95rem;
    margin-bottom: 1rem;

    &:last-child { margin-bottom: 0; }
  }

  strong {
    color: ${(props) => props.theme.text};
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  }
`;