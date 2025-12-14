import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

// 기존 Drivers/style.js의 Header, SearchBar 등을 그대로 import해서 써도 되지만,
// 독립성을 위해 여기에 필요한 스타일을 재정의합니다. (Drivers와 거의 유사)
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
  span { color: ${(props) => props.theme.colors.primary}; }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.theme.border};
  padding: 0.8rem 1.2rem;
  border-radius: 99px;
  width: 300px;
`;

export const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  color: ${(props) => props.theme.text};
  width: 100%;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TeamCard = styled.div`
  background-color: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px ${(props) => props.$teamColor}33;
    border-color: ${(props) => props.$teamColor};
  }

  /* 상단 팀 컬러 바 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${(props) => props.$teamColor};
  }
`;

export const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const TeamLogoPlaceholder = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.$teamColor};
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 900;
  font-style: italic;
`;

export const TeamInfo = styled.div`
  margin-bottom: 1.5rem;
`;

export const CarModel = styled.span`
  background: ${(props) => props.theme.bg};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${(props) => props.theme.subText};
`;

export const TeamName = styled.h3`
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0.5rem 0;
  font-style: italic;
`;

export const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${(props) => props.theme.border};
  padding-top: 1rem;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  span { font-size: 0.7rem; color: ${(props) => props.theme.subText}; }
  strong { font-size: 1.1rem; font-weight: 800; font-style: italic; }
`;