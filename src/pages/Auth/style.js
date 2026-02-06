import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

export const LogoText = styled.div`
  font-size: 2rem;
  font-weight: 900;
  font-style: italic;
  color: #e10600;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const AuthTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.text};
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 14px;
  color: ${props => props.theme.subText};
  display: flex;
  align-items: center;
`;

export const AuthInput = styled.input`
  width: 100%;
  padding: 14px 14px 14px 44px;
  background: ${props => props.theme.bg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  color: ${props => props.theme.text};
  font-size: 1rem;
  transition: all 0.2s;

  &::placeholder {
    color: ${props => props.theme.subText};
  }

  &:focus {
    outline: none;
    border-color: #e10600;
    box-shadow: 0 0 0 3px rgba(225, 6, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const AuthButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #e10600 0%, #ff4d4d 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(225, 6, 0, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const AuthLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: ${props => props.theme.subText};
  font-size: 0.9rem;

  a {
    color: #e10600;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 12px;
  color: #e74c3c;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(46, 204, 113, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: 12px;
  color: #2ecc71;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;
