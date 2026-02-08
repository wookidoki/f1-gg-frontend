import React from 'react';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  margin-top: 1.5rem;
`;

const ChartTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChartArea = styled.div`
  position: relative;
  height: 200px;
  display: flex;
  align-items: flex-end;
  gap: 4px;
  padding-bottom: 30px;
`;

const YAxis = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 30px;
  width: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.7rem;
  color: ${props => props.theme.subText};
`;

const Bar = styled.div`
  flex: 1;
  min-width: 20px;
  max-width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  .bar {
    width: 100%;
    background: ${props => {
      const pos = props.$position;
      if (pos === 1) return 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)';
      if (pos === 2) return 'linear-gradient(180deg, #C0C0C0 0%, #A0A0A0 100%)';
      if (pos === 3) return 'linear-gradient(180deg, #CD7F32 0%, #8B4513 100%)';
      if (pos <= 10) return 'linear-gradient(180deg, #27ae60 0%, #1e8449 100%)';
      return props.$color || props.theme.colors?.primary || '#e10600';
    }};
    border-radius: 4px 4px 0 0;
    height: ${props => props.$height}px;
    min-height: 4px;
    position: relative;

    .position {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.7rem;
      font-weight: 700;
      color: ${props => props.$position <= 3 ? '#FFD700' : props.theme?.text || 'inherit'};
    }
  }

  .label {
    font-size: 0.65rem;
    color: ${props => props.theme.subText};
    margin-top: 6px;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    max-height: 60px;
    overflow: hidden;
  }
`;

const Legend = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  font-size: 0.75rem;
  color: ${props => props.theme.subText};

  .item {
    display: flex;
    align-items: center;
    gap: 4px;

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 2px;
    }
  }
`;

const PositionChart = ({ data, title, teamColor }) => {
  if (!data || data.length === 0) return null;

  // 최대 순위 (1이 최고)
  const maxPosition = 20;
  const chartHeight = 150;

  return (
    <ChartContainer>
      <ChartTitle>{title || '시즌 순위 변화'}</ChartTitle>

      <ChartArea>
        {data.map((item, index) => {
          const height = ((maxPosition - item.position + 1) / maxPosition) * chartHeight;

          return (
            <Bar
              key={index}
              $position={item.position}
              $height={height}
              $color={teamColor}
              title={`R${item.round}: P${item.position} (+${item.points}pts)`}
            >
              <div className="bar">
                <span className="position">P{item.position}</span>
              </div>
              <span className="label">R{item.round}</span>
            </Bar>
          );
        })}
      </ChartArea>

      <Legend>
        <div className="item">
          <div className="dot" style={{ background: '#FFD700' }} />
          <span>우승</span>
        </div>
        <div className="item">
          <div className="dot" style={{ background: '#C0C0C0' }} />
          <span>2위</span>
        </div>
        <div className="item">
          <div className="dot" style={{ background: '#CD7F32' }} />
          <span>3위</span>
        </div>
        <div className="item">
          <div className="dot" style={{ background: '#27ae60' }} />
          <span>포인트</span>
        </div>
      </Legend>
    </ChartContainer>
  );
};

export default PositionChart;
