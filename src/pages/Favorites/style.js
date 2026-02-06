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

export const Section = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.subText};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;

  h3 {
    margin-top: 1rem;
    font-size: 1.3rem;
    font-weight: 700;
  }

  p {
    margin-top: 0.5rem;
    color: ${props => props.theme.subText};
  }

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 1.5rem;
    padding: 12px 24px;
    background: #e10600;
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(225, 6, 0, 0.3);
    }
  }
`;

export const FavoriteCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #e10600;
    transform: translateX(4px);
  }
`;

export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: #e10600;
  }

  .target-id {
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
  }
`;
