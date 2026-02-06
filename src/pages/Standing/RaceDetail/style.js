import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${(props) => props.theme.subText};
  margin-bottom: 1.5rem;
  font-weight: 600;
  transition: color 0.2s;
  &:hover { color: ${(props) => props.theme.text}; }
`;

export const Header = styled.div`
  margin-bottom: 2rem;
  
  .round-badge {
    display: inline-block;
    background: ${(props) => props.theme.colors.primary};
    color: white;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 4px 8px;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  h1 { 
    font-size: 2.2rem; 
    font-weight: 900; 
    font-style: italic; 
    margin-bottom: 0.5rem; 
    line-height: 1.1;
  }

  .meta { 
    display: flex; 
    gap: 1.5rem; 
    color: ${(props) => props.theme.subText}; 
    font-size: 0.95rem; 
  }
  
  .meta span { display: flex; align-items: center; gap: 6px; }
`;

// --- NEW: 트랙 정보 섹션 스타일 ---
export const TrackSection = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr; /* 지도가 조금 더 크게 */
  gap: 2rem;
  background-color: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
`;

export const TrackMap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.bg};
  border-radius: 16px;
  min-height: 250px;
  border: 1px dashed ${(props) => props.theme.border}; /* 이미지 없을 때 점선 */

  .map-placeholder {
    text-align: center;
    color: ${(props) => props.theme.subText};
    .track-shape-mock {
      font-size: 1.5rem;
      font-weight: 700;
      display: block;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
  }

  /* 실제 이미지 태그용 스타일 */
  img {
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: contain;
    filter: invert(1); /* 다크모드일 때 지도 이미지가 흰색이면 반전 필요시 사용 */
  }
`;

export const TrackStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const StatCard = styled.div`
  background: ${(props) => props.theme.bg};
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  .icon {
    color: ${(props) => props.theme.colors.primary};
    opacity: 0.8;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  .label {
    font-size: 0.7rem;
    font-weight: 700;
    color: ${(props) => props.theme.subText};
    letter-spacing: 0.5px;
  }

  strong {
    font-size: 1.1rem;
    font-weight: 800;
  }

  small {
    font-size: 0.75rem;
    color: ${(props) => props.theme.subText};
    margin-top: 2px;
  }
`;

// --- 기존 테이블 스타일 ---
export const ResultTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  
  th { 
    text-align: left; 
    padding: 1rem; 
    color: ${(props) => props.theme.subText}; 
    font-size: 0.75rem; 
    font-weight: 700;
    border-bottom: 2px solid ${(props) => props.theme.border}; 
  }
  
  td { 
    padding: 1rem; 
    border-bottom: 1px solid ${(props) => props.theme.border}; 
    font-size: 0.95rem; 
    color: ${(props) => props.theme.text};
  }
  
  .pos { font-weight: 800; display: flex; align-items: center; gap: 8px; font-style: italic; }
  .driver { font-weight: 700; display: flex; align-items: center; }
  .team { font-size: 0.85rem; font-weight: 600; }
  .grid { font-size: 0.9rem; }
  .pts { font-weight: 800; color: ${(props) => props.theme.colors.primary}; }

  /* 1,2,3위 배경 하이라이트 */
  .top-1 { background: rgba(255, 215, 0, 0.08); }
  .top-2 { background: rgba(192, 192, 192, 0.05); }
  .top-3 { background: rgba(205, 127, 50, 0.05); }
`;