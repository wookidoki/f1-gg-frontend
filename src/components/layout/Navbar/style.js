import styled from 'styled-components';

// 1. 네비게이션 바 전체 틀 (유리 효과 강화)
export const NavWrapper = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.navBg};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${(props) => props.theme.border};
  transition: all 0.3s ease;

  @media (min-width: 769px) {
    height: 70px;
  }
`;

// 2. 내용물 컨테이너 (넓게 시원하게)
export const NavContent = styled.div`
  max-width: 1440px; /* 대시보드니까 폭을 넓게 */
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 3. 로고 디자인 (GP.GG)
export const Logo = styled.div`
  font-family: 'Titillium Web', sans-serif; /* F1 스타일 폰트 필수 */
  font-size: 26px;
  font-weight: 900;
  font-style: italic; /* 기울임꼴로 속도감 표현 */
  letter-spacing: -1px;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  user-select: none;

  span {
    color: ${(props) => props.theme.colors.primary}; /* .GG는 빨강 */
  }

  &:hover {
    opacity: 0.9;
  }
`;

// 4. 메뉴 리스트 컨테이너
export const MenuList = styled.ul` /* div -> ul로 변경 (시멘틱 태그) */
  display: flex;
  gap: 32px; /* 간격 넓힘 */
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet || '768px'}) {
    display: none; /* 모바일 대응은 나중에 햄버거 메뉴로 */
  }
`;

// 5. 개별 메뉴 아이템 (밑줄 효과)
export const MenuItem = styled.li` /* button -> li로 변경 */
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
  cursor: pointer;
  font-size: 15px;
  font-weight: ${(props) => (props.$isActive ? '700' : '500')}; /* 활성화 시 굵게 */
  color: ${(props) => (props.$isActive ? props.theme.colors.primary : props.theme.subText)};
  transition: color 0.2s ease;

  /* 아이콘 크기 */
  svg {
    stroke-width: 2.5px;
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  /* 🔥 활성화 시 하단 레드 바 (F1 스타일) */
  .active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${(props) => props.theme.colors.primary};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    box-shadow: 0 -2px 6px ${(props) => props.theme.colors.primary}40; /* 살짝 빛나는 효과 */
  }
`;

// 6. 오른쪽 버튼 그룹
export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px; /* 완전 원형보다 살짝 둥근 사각형이 더 모던함 */
  background-color: transparent;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.border};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.bg};
  }
`;

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: ${(props) => props.theme.colors.primary};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
    box-shadow: 0 4px 12px ${(props) => props.theme.colors.primary}50;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.bg};
  border: 1px solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};
  font-size: 14px;
  font-weight: 600;

  svg {
    color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// 모바일 햄버거 버튼
export const HamburgerButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: transparent;
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};

  @media (max-width: 768px) {
    display: flex;
  }
`;

// 모바일 드로어 오버레이
export const MobileOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 150;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

// 모바일 드로어
export const MobileDrawer = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
  background: ${props => props.theme.cardBg};
  z-index: 151;
  padding: 20px;
  animation: slideIn 0.3s ease;
  overflow-y: auto;

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${props => props.theme.border};
`;

export const DrawerCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${props => props.theme.bg};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
`;

export const MobileMenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MobileMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: ${props => props.$isActive ? '700' : '500'};
  color: ${props => props.$isActive ? props.theme.colors.primary : props.theme.text};
  background: ${props => props.$isActive ? `${props.theme.colors.primary}15` : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.theme.bg};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const MobileAuthSection = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid ${props => props.theme.border};
`;

export const MobileUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${props => props.theme.bg};
  border-radius: 12px;
  margin-bottom: 12px;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary}20;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.primary};
  }

  .info {
    .name {
      font-weight: 600;
      font-size: 15px;
    }
    .email {
      font-size: 13px;
      color: ${props => props.theme.subText};
    }
  }
`;

export const MobileAuthButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.$variant === 'primary' ? '#fff' : props.theme.text};
  background: ${props => props.$variant === 'primary' ? props.theme.colors.primary : props.theme.bg};
  border: 1px solid ${props => props.$variant === 'primary' ? 'transparent' : props.theme.border};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
