import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 60vh;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const PageTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 2rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatCard = styled.div`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;

  .icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    background: ${props => props.$bg || 'rgba(225, 6, 0, 0.1)'};
  }

  .value {
    font-size: 2rem;
    font-weight: 900;
    color: ${props => props.$color || '#e10600'};
  }

  .label {
    font-size: 0.85rem;
    color: ${props => props.theme.subText};
    margin-top: 4px;
  }
`;

export const Section = styled.div`
  margin-bottom: 2.5rem;
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const ChartContainer = styled.div`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 16px;
  padding: 1.5rem;
`;

export const BarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  .rank {
    width: 30px;
    font-size: 1.1rem;
    font-weight: 700;
    color: ${props => props.$rank === 1 ? '#FFD700' : props.$rank === 2 ? '#C0C0C0' : props.$rank === 3 ? '#CD7F32' : props.theme.subText};
  }

  .name {
    width: 140px;
    font-weight: 600;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bar-container {
    flex: 1;
    height: 28px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    overflow: hidden;
    position: relative;
  }

  .bar {
    height: 100%;
    border-radius: 6px;
    transition: width 0.8s ease-out;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
  }

  .points {
    font-size: 0.85rem;
    font-weight: 700;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }

  .wins {
    width: 60px;
    text-align: right;
    font-size: 0.85rem;
    color: ${props => props.theme.subText};

    span {
      color: #f1c40f;
      font-weight: 700;
    }
  }
`;

export const TeamCompareGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TeamCard = styled.div`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  border-left: 4px solid ${props => props.$color || '#e10600'};

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .team-name {
    font-size: 1.1rem;
    font-weight: 700;
  }

  .team-rank {
    font-size: 0.85rem;
    padding: 4px 12px;
    background: ${props => props.$color || '#e10600'}20;
    color: ${props => props.$color || '#e10600'};
    border-radius: 20px;
    font-weight: 600;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    text-align: center;
  }

  .stat-item {
    .value {
      font-size: 1.5rem;
      font-weight: 800;
    }
    .label {
      font-size: 0.75rem;
      color: ${props => props.theme.subText};
      margin-top: 2px;
    }
  }

  .drivers {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid ${props => props.theme.border};
    display: flex;
    gap: 0.5rem;
  }

  .driver-tag {
    font-size: 0.8rem;
    padding: 4px 10px;
    background: rgba(255,255,255,0.1);
    border-radius: 6px;
  }
`;

export const WinDistribution = styled.div`
  display: flex;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1rem;
`;

export const WinSegment = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  transition: width 0.5s ease-out;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`;
