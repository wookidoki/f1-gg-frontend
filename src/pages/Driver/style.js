import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem 1rem;
  animation: fadeIn 0.5s ease-in-out;
`;

// 1. 헤더 영역 (제목 + 검색창)
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.theme.border};
  padding: 0.8rem 1.2rem;
  border-radius: 99px;
  width: 300px;
  gap: 10px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  color: ${(props) => props.theme.text};
  font-size: 0.95rem;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.subText};
  }
`;

// 2. 그리드 레이아웃
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개 */
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// 3. 개별 드라이버 카드
export const DriverCard = styled.div`
  background-color: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

export const TeamColorBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: ${(props) => props.$color};
`;

export const DriverNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  font-style: italic;
  color: ${(props) => props.theme.text};
  opacity: 0.8;
  line-height: 1;
`;

export const DriverInfo = styled.div`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`;

export const DriverName = styled.h3`
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 4px;
`;

export const TeamName = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.subText};
  font-weight: 500;
`;

// 4. 하단 스탯 정보
export const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${(props) => props.theme.border};
  padding-top: 1rem;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  span {
    font-size: 0.7rem;
    color: ${(props) => props.theme.subText};
    font-weight: 700;
  }
  
  strong {
    font-size: 1.1rem;
    font-weight: 800;
    font-style: italic;
  }
`;