import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { User, Mail, Heart, LogOut, ChevronRight, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useFavoriteList } from '../../hooks/useFavorite';

const PageContainer = styled.div`
  width: 100%;
  min-height: 60vh;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ProfileCard = styled.div`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e10600 0%, #ff4d4d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 30px rgba(225, 6, 0, 0.3);
`;

const UserName = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  color: ${props => props.theme.subText};
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.border};
`;

const StatItem = styled.div`
  text-align: center;

  .value {
    font-size: 2rem;
    font-weight: 900;
    color: ${props => props.theme.colors.primary};
  }

  .label {
    font-size: 0.85rem;
    color: ${props => props.theme.subText};
    margin-top: 4px;
  }
`;

const MenuList = styled.div`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 16px;
  overflow: hidden;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid ${props => props.theme.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${props => props.theme.bg};
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$bg || 'rgba(225, 6, 0, 0.1)'};
    color: ${props => props.$color || props.theme.colors.primary};
  }

  .info {
    flex: 1;

    .title {
      font-weight: 600;
    }

    .sub {
      font-size: 0.85rem;
      color: ${props => props.theme.subText};
    }
  }

  .arrow {
    color: ${props => props.theme.subText};
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;

  h2 {
    margin: 1rem 0 0.5rem;
    font-size: 1.5rem;
  }

  p {
    color: ${props => props.theme.subText};
    margin-bottom: 1.5rem;
  }

  button {
    padding: 12px 32px;
    background: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(225, 6, 0, 0.3);
    }
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { favorites } = useFavoriteList();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <PageContainer>
        <LoginPrompt>
          <User size={48} style={{ opacity: 0.3 }} />
          <h2>로그인이 필요합니다</h2>
          <p>프로필을 보려면 로그인해주세요.</p>
          <button onClick={() => navigate('/login')}>로그인하기</button>
        </LoginPrompt>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ProfileCard>
        <Avatar>
          <User size={48} color="white" />
        </Avatar>
        <UserName>{user?.nickname}</UserName>
        <UserEmail>
          <Mail size={16} /> {user?.email}
        </UserEmail>

        <StatsGrid>
          <StatItem>
            <div className="value">{favorites.drivers?.length || 0}</div>
            <div className="label">즐겨찾기 드라이버</div>
          </StatItem>
          <StatItem>
            <div className="value">{favorites.constructors?.length || 0}</div>
            <div className="label">즐겨찾기 팀</div>
          </StatItem>
        </StatsGrid>
      </ProfileCard>

      <MenuList>
        <MenuItem onClick={() => navigate('/favorites')}>
          <div className="icon">
            <Heart size={20} />
          </div>
          <div className="info">
            <div className="title">내 즐겨찾기</div>
            <div className="sub">드라이버, 팀 즐겨찾기 관리</div>
          </div>
          <ChevronRight size={20} className="arrow" />
        </MenuItem>

        <MenuItem $bg="rgba(52, 152, 219, 0.1)" $color="#3498db">
          <div className="icon">
            <Settings size={20} />
          </div>
          <div className="info">
            <div className="title">설정</div>
            <div className="sub">알림, 테마 설정</div>
          </div>
          <ChevronRight size={20} className="arrow" />
        </MenuItem>

        <MenuItem onClick={handleLogout} $bg="rgba(231, 76, 60, 0.1)" $color="#e74c3c">
          <div className="icon">
            <LogOut size={20} />
          </div>
          <div className="info">
            <div className="title">로그아웃</div>
            <div className="sub">계정에서 로그아웃</div>
          </div>
        </MenuItem>
      </MenuList>
    </PageContainer>
  );
};

export default Profile;
