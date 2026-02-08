import React, { Component } from 'react';
import styled from 'styled-components';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(231, 76, 60, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  color: ${props => props.theme?.subText || '#888'};
  margin-bottom: 2rem;
  max-width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
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
    background: #e10600;
    color: white;
    border: none;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(225, 6, 0, 0.3);
    }
  ` : `
    background: transparent;
    color: inherit;
    border: 2px solid #333;

    &:hover {
      border-color: #e10600;
      color: #e10600;
    }
  `}
`;

const ErrorDetails = styled.details`
  margin-top: 2rem;
  text-align: left;
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;

  summary {
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  pre {
    font-size: 0.8rem;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
    color: #e74c3c;
  }
`;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // 여기에 에러 로깅 서비스 연동 가능 (Sentry 등)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <IconWrapper>
            <AlertTriangle size={40} color="#e74c3c" />
          </IconWrapper>
          <Title>문제가 발생했습니다</Title>
          <Message>
            예기치 않은 오류가 발생했습니다.
            페이지를 새로고침하거나 홈으로 이동해주세요.
          </Message>
          <ButtonGroup>
            <Button $primary onClick={this.handleRefresh}>
              <RefreshCw size={18} /> 새로고침
            </Button>
            <Button onClick={this.handleGoHome}>
              <Home size={18} /> 홈으로
            </Button>
          </ButtonGroup>

          {this.state.error && (
            <ErrorDetails>
              <summary>오류 상세 정보</summary>
              <pre>{this.state.error.toString()}</pre>
              {this.state.errorInfo && (
                <pre>{this.state.errorInfo.componentStack}</pre>
              )}
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
