import styled from 'styled-components';

export const ScheduleContainer = styled.div`
  width: 100%;
  animation: fadeIn 0.5s ease-in-out;
  padding-bottom: 2rem;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    font-size: 2rem;
    font-weight: 900;
    font-style: italic;
    color: ${(props) => props.theme.text};
    display: flex;
    align-items: center;
    gap: 10px;
    
    span {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  p {
    color: ${(props) => props.theme.subText};
    font-weight: 500;
    margin-top: 0.5rem;
  }
`;

export const RaceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RaceCard = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.$isUpcoming ? props.theme.colors.primary : props.theme.border};
  border-left: 4px solid ${(props) => props.$isUpcoming ? props.theme.colors.primary : 'transparent'};
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;

  /* 다가오는 경기 강조 효과 */
  ${(props) => props.$isUpcoming && `
    box-shadow: 0 4px 12px rgba(225, 6, 0, 0.1);
    
    &::after {
      content: 'UPCOMING';
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 0.6rem;
      font-weight: 900;
      color: #e10600;
      background: rgba(225, 6, 0, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
    }
  `}

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  margin-right: 1.5rem;
  
  span:first-child {
    font-size: 0.8rem;
    font-weight: 700;
    color: ${(props) => props.theme.subText};
    text-transform: uppercase;
  }
  
  span:last-child {
    font-size: 1.5rem;
    font-weight: 900;
    color: ${(props) => props.theme.text};
  }

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 8px;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`;

export const RaceInfo = styled.div`
  flex: 1;

  h3 {
    font-size: 1.2rem;
    font-weight: 800;
    color: ${(props) => props.theme.text};
    margin-bottom: 4px;
  }

  p {
    font-size: 0.9rem;
    color: ${(props) => props.theme.subText};
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

export const RaceAction = styled.div`
  text-align: right;
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
    margin-top: 0.5rem;
    border-top: 1px solid ${(props) => props.theme.border};
    padding-top: 1rem;
  }
`;

export const WinnerBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: ${(props) => props.theme.bg};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.border};

  svg {
    color: ${(props) => props.theme.colors.gold};
  }
`;

export const TicketButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
`;