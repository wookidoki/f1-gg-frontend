import styled from 'styled-components';

// 1. 네비게이션 바 전체 틀 (유리 효과 강화)
export const NavWrapper = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100; /* 다른 요소보다 확실히 위에 오도록 */
  width: 100%;
  height: 70px; /* 높이를 살짝 키워 여유 있게 */
  background-color: ${(props) => props.theme.navBg};
  backdrop-filter: blur(12px); /* 블러 강도 증가 */
  border-bottom: 1px solid ${(props) => props.theme.border};
  transition: all 0.3s ease;
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
`;
