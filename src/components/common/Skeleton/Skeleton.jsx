import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${props => props.theme.cardBg} 25%,
    ${props => props.theme.border} 50%,
    ${props => props.theme.cardBg} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${props => props.$radius || '8px'};
`;

// 기본 박스 스켈레톤
export const SkeletonBox = styled(SkeletonBase)`
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '20px'};
`;

// 원형 스켈레톤 (아바타용)
export const SkeletonCircle = styled(SkeletonBase)`
  width: ${props => props.$size || '40px'};
  height: ${props => props.$size || '40px'};
  border-radius: 50%;
`;

// 텍스트 라인 스켈레톤
export const SkeletonText = styled(SkeletonBase)`
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '16px'};
  margin-bottom: ${props => props.$mb || '8px'};
`;

// 카드 스켈레톤
const CardWrapper = styled.div`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 16px;
  padding: 1.5rem;
`;

export const SkeletonCard = ({ children }) => (
  <CardWrapper>{children}</CardWrapper>
);

// 드라이버 카드 스켈레톤
const DriverCardWrapper = styled(CardWrapper)`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DriverCardSkeleton = () => (
  <DriverCardWrapper>
    <div>
      <SkeletonBox $width="60px" $height="50px" $radius="8px" />
      <div style={{ marginTop: '1rem' }}>
        <SkeletonText $width="80%" $height="20px" />
        <SkeletonText $width="60%" $height="14px" />
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <SkeletonBox $width="50px" $height="30px" />
      <SkeletonBox $width="50px" $height="30px" />
      <SkeletonBox $width="50px" $height="30px" />
    </div>
  </DriverCardWrapper>
);

// 히어로 배너 스켈레톤
const HeroWrapper = styled.div`
  width: 100%;
  padding: 2.5rem;
  border-radius: 24px;
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  margin-bottom: 2rem;
`;

export const HeroBannerSkeleton = () => (
  <HeroWrapper>
    <SkeletonBox $width="100px" $height="28px" $radius="20px" style={{ marginBottom: '1rem' }} />
    <SkeletonText $width="70%" $height="40px" $mb="12px" />
    <SkeletonText $width="50%" $height="20px" />
  </HeroWrapper>
);

// 스탯 카드 스켈레톤
const StatCardWrapper = styled(CardWrapper)`
  text-align: center;
  padding: 1.5rem;
`;

export const StatCardSkeleton = () => (
  <StatCardWrapper>
    <SkeletonCircle $size="48px" style={{ margin: '0 auto 1rem' }} />
    <SkeletonText $width="60%" $height="32px" style={{ margin: '0 auto' }} />
    <SkeletonText $width="80%" $height="14px" style={{ margin: '0.5rem auto 0' }} />
  </StatCardWrapper>
);

// 바 차트 행 스켈레톤
const BarRowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const BarRowSkeleton = () => (
  <BarRowWrapper>
    <SkeletonBox $width="30px" $height="24px" />
    <SkeletonBox $width="100px" $height="20px" />
    <SkeletonBox $height="28px" style={{ flex: 1 }} />
    <SkeletonBox $width="50px" $height="20px" />
  </BarRowWrapper>
);

// 그리드 스켈레톤 (여러 카드)
export const GridSkeleton = ({ count = 4, CardComponent = DriverCardSkeleton }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <CardComponent key={i} />
    ))}
  </>
);

export default {
  Box: SkeletonBox,
  Circle: SkeletonCircle,
  Text: SkeletonText,
  Card: SkeletonCard,
  DriverCard: DriverCardSkeleton,
  HeroBanner: HeroBannerSkeleton,
  StatCard: StatCardSkeleton,
  BarRow: BarRowSkeleton,
  Grid: GridSkeleton
};
