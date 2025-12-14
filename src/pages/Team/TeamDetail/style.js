import styled from 'styled-components';

export const DetailContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem 1rem;
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const BackButton = styled.button`
  color: ${(props) => props.theme.subText};
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2rem;
  font-weight: 600;
  &:hover { color: ${(props) => props.theme.text}; }
`;

export const HeroSection = styled.div`
  position: relative;
  background: linear-gradient(120deg, ${(props) => props.$color} 0%, ${(props) => props.theme.cardBg} 100%);
  padding: 3rem;
  border-radius: 24px;
  color: white;
  overflow: hidden;
  margin-bottom: 2rem;
  min-height: 250px;
  display: flex;
  align-items: center;
`;

export const TeamLogoLarge = styled.div`
  position: absolute;
  right: -20px;
  bottom: -40px;
  font-size: 15rem;
  font-weight: 900;
  font-style: italic;
  opacity: 0.1;
  pointer-events: none;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

export const InfoCard = styled.div`
  background: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.theme.border};
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  span { font-size: 0.8rem; color: ${(props) => props.theme.subText}; }
  strong { font-size: 1.3rem; font-weight: 800; font-style: italic; display: block; }
`;

export const TechSpecSection = styled.div`
  background: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;

  .spec-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 1.5rem;
    border-top: 1px solid ${(props) => props.theme.border};
    padding-top: 1.5rem;

    @media (max-width: 768px) { grid-template-columns: 1fr; gap: 1rem; }
  }
`;

export const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  .label { font-size: 0.8rem; font-weight: 700; color: ${(props) => props.theme.colors.primary}; letter-spacing: 1px; }
  .value { font-size: 1.2rem; font-weight: 600; color: ${(props) => props.theme.text}; }
`;

export const ChartSection = styled.div`
  background: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 20px;
  padding: 2rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DriverLinkBox = styled.button`
  background: ${(props) => props.theme.bg};
  border: 1px solid ${(props) => props.theme.border};
  padding: 10px 20px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.text};
  font-weight: 600;
  transition: all 0.2s;

  strong { color: ${(props) => props.theme.colors.primary}; }

  &:hover {
    background: ${(props) => props.theme.border};
  }
`;