import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  AuthContainer, AuthCard, AuthTitle, AuthForm,
  InputGroup, InputIcon, AuthInput, AuthButton,
  AuthLink, ErrorMessage, LogoText
} from './style';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <LogoText>F1.GG</LogoText>
        <AuthTitle>로그인</AuthTitle>

        {error && (
          <ErrorMessage>
            <AlertCircle size={16} />
            {error}
          </ErrorMessage>
        )}

        <AuthForm onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon><Mail size={18} /></InputIcon>
            <AuthInput
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </InputGroup>

          <InputGroup>
            <InputIcon><Lock size={18} /></InputIcon>
            <AuthInput
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </InputGroup>

          <AuthButton type="submit" disabled={loading}>
            {loading ? '로그인 중...' : (
              <>
                <LogIn size={18} />
                로그인
              </>
            )}
          </AuthButton>
        </AuthForm>

        <AuthLink>
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </AuthLink>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;
