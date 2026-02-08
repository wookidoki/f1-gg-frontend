import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowLeft, Moon, Sun, Bell, BellOff, Globe, Trash2,
  ChevronRight, Smartphone, Monitor
} from 'lucide-react';
import { useToast } from '../../components/common/Toast/Toast';

const PageContainer = styled.div`
  width: 100%;
  min-height: 60vh;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 0;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
`;

const Section = styled.div`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 16px;
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${props => props.theme.subText};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 1rem 1.25rem 0.5rem;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${props => props.theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$bg || 'rgba(225, 6, 0, 0.1)'};
    color: ${props => props.$color || props.theme.colors.primary};
  }

  .text {
    .title {
      font-weight: 600;
      margin-bottom: 2px;
    }
    .desc {
      font-size: 0.8rem;
      color: ${props => props.theme.subText};
    }
  }
`;

const Toggle = styled.button`
  width: 52px;
  height: 28px;
  border-radius: 14px;
  border: none;
  background: ${props => props.$active ? props.theme.colors.primary : props.theme.border};
  position: relative;
  cursor: pointer;
  transition: background 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${props => props.$active ? '27px' : '3px'};
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: white;
    transition: left 0.2s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
`;

const ThemeSelector = styled.div`
  display: flex;
  gap: 8px;
`;

const ThemeOption = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 2px solid ${props => props.$active ? props.theme.colors.primary : props.theme.border};
  background: ${props => props.$active ? 'rgba(225, 6, 0, 0.1)' : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.text};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.$danger ? '#e74c3c' : props.theme.border};
  background: ${props => props.$danger ? 'rgba(231, 76, 60, 0.1)' : 'transparent'};
  color: ${props => props.$danger ? '#e74c3c' : props.theme.text};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$danger ? 'rgba(231, 76, 60, 0.2)' : props.theme.bg};
  }
`;

const VersionInfo = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.subText};
  font-size: 0.85rem;
`;

const Settings = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem('notifications') === 'true';
  });

  const handleNotificationToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem('notifications', String(newValue));
    toast.success('설정 변경', newValue ? '알림이 활성화되었습니다.' : '알림이 비활성화되었습니다.');
  };

  const handleClearCache = () => {
    if (window.confirm('캐시를 삭제하시겠습니까? 로그인 정보는 유지됩니다.')) {
      localStorage.removeItem('favorites_cache');
      localStorage.removeItem('drivers_cache');
      localStorage.removeItem('teams_cache');
      toast.success('캐시 삭제', '캐시가 삭제되었습니다.');
    }
  };

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </BackButton>
        <Title>설정</Title>
      </Header>

      {/* 테마 설정 */}
      <Section>
        <SectionTitle>화면</SectionTitle>
        <SettingItem>
          <SettingLabel $bg="rgba(52, 152, 219, 0.1)" $color="#3498db">
            <div className="icon">
              {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            <div className="text">
              <div className="title">테마</div>
              <div className="desc">앱 테마를 선택하세요</div>
            </div>
          </SettingLabel>
          <ThemeSelector>
            <ThemeOption $active={isDarkMode} onClick={() => !isDarkMode && toggleTheme()}>
              <Moon size={16} /> 다크
            </ThemeOption>
            <ThemeOption $active={!isDarkMode} onClick={() => isDarkMode && toggleTheme()}>
              <Sun size={16} /> 라이트
            </ThemeOption>
          </ThemeSelector>
        </SettingItem>
      </Section>

      {/* 알림 설정 */}
      <Section>
        <SectionTitle>알림</SectionTitle>
        <SettingItem>
          <SettingLabel $bg="rgba(155, 89, 182, 0.1)" $color="#9b59b6">
            <div className="icon">
              {notifications ? <Bell size={18} /> : <BellOff size={18} />}
            </div>
            <div className="text">
              <div className="title">푸시 알림</div>
              <div className="desc">레이스 시작 전 알림 받기</div>
            </div>
          </SettingLabel>
          <Toggle $active={notifications} onClick={handleNotificationToggle} />
        </SettingItem>
      </Section>

      {/* 일반 설정 */}
      <Section>
        <SectionTitle>일반</SectionTitle>
        <SettingItem>
          <SettingLabel $bg="rgba(46, 204, 113, 0.1)" $color="#2ecc71">
            <div className="icon">
              <Globe size={18} />
            </div>
            <div className="text">
              <div className="title">언어</div>
              <div className="desc">한국어</div>
            </div>
          </SettingLabel>
          <ChevronRight size={20} style={{ opacity: 0.3 }} />
        </SettingItem>
      </Section>

      {/* 데이터 관리 */}
      <Section>
        <SectionTitle>데이터</SectionTitle>
        <SettingItem>
          <SettingLabel $bg="rgba(231, 76, 60, 0.1)" $color="#e74c3c">
            <div className="icon">
              <Trash2 size={18} />
            </div>
            <div className="text">
              <div className="title">캐시 삭제</div>
              <div className="desc">저장된 임시 데이터 삭제</div>
            </div>
          </SettingLabel>
          <ActionButton $danger onClick={handleClearCache}>
            삭제
          </ActionButton>
        </SettingItem>
      </Section>

      <VersionInfo>
        RACE.GG v1.0.0<br />
        Made with F1 passion
      </VersionInfo>
    </PageContainer>
  );
};

export default Settings;
