import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Home, ArrowLeft, Flag } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
`;

const ErrorCode = styled.div`
  font-size: 8rem;
  font-weight: 900;
  font-style: italic;
  color: ${props => props.theme.colors.primary};
  line-height: 1;
  position: relative;

  &::after {
    content: 'DNF';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    background: ${props => props.theme.cardBg};
    padding: 4px 12px;
    border-radius: 8px;
    border: 2px solid ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 5rem;

    &::after {
      font-size: 1rem;
    }
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 1.5rem 0 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Description = styled.p`
  color: ${props => props.theme.subText};
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.$primary ? `
    background: ${props.theme.colors.primary};
    color: white;
    border: none;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px ${props.theme.colors.primary}40;
    }
  ` : `
    background: transparent;
    color: ${props.theme.text};
    border: 2px solid ${props.theme.border};

    &:hover {
      border-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.primary};
    }
  `}
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Flag size={48} color="#e10600" style={{ marginBottom: '1rem' }} />
      <ErrorCode>404</ErrorCode>
      <Title>페이지를 찾을 수 없습니다</Title>
      <Description>
        요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
        마치 레이스에서 리타이어한 것처럼요!
      </Description>
      <ButtonGroup>
        <Button $primary onClick={() => navigate('/')}>
          <Home size={18} /> 홈으로
        </Button>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> 뒤로 가기
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default NotFound;
