import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  AuthContainer, AuthCard, AuthTitle, AuthForm,
  InputGroup, InputIcon, AuthInput, AuthButton,
  AuthLink, ErrorMessage, SuccessMessage, LogoText
} from './style';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 유효성 검사
    if (!email || !password || !nickname) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    if (nickname.length < 2) {
      setError('닉네임은 2자 이상이어야 합니다.');
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, nickname);
      setSuccess('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
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
        <AuthTitle>회원가입</AuthTitle>

        {error && (
          <ErrorMessage>
            <AlertCircle size={16} />
            {error}
          </ErrorMessage>
        )}

        {success && (
          <SuccessMessage>
            <CheckCircle size={16} />
            {success}
          </SuccessMessage>
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
            <InputIcon><User size={18} /></InputIcon>
            <AuthInput
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={loading}
            />
          </InputGroup>

          <InputGroup>
            <InputIcon><Lock size={18} /></InputIcon>
            <AuthInput
              type="password"
              placeholder="비밀번호 (6자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </InputGroup>

          <InputGroup>
            <InputIcon><Lock size={18} /></InputIcon>
            <AuthInput
              type="password"
              placeholder="비밀번호 확인"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              disabled={loading}
            />
          </InputGroup>

          <AuthButton type="submit" disabled={loading}>
            {loading ? '가입 중...' : (
              <>
                <UserPlus size={18} />
                회원가입
              </>
            )}
          </AuthButton>
        </AuthForm>

        <AuthLink>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </AuthLink>
      </AuthCard>
    </AuthContainer>
  );
};

export default Signup;
