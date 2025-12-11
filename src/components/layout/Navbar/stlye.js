import styled from 'styled-components';

// 1. 네비게이션 바 전체 틀 (상단 고정, 반투명 효과)
export const NavWrapper = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  height: 64px;
  background-color: ${(props) => props.theme.navBg}; /* 테마별 반투명 배경 */
  backdrop-filter: blur(10px); /* 블러 효과 */
  border-bottom: 1px solid ${(props) => props.theme.border};
  transition: background-color 0.3s, border-color 0.3s;
`;

// 2. 내용물 담는 컨테이너 (좌우 여백, 중앙 정렬)
export const NavContent = styled.div`
  max-width: 1024px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 3. 로고 디자인
export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 1.5rem;
  font-weight: 900;
  font-style: italic;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  letter-spacing: -1px;

  span {
    color: ${(props) => props.theme.colors.primary}; /* F1 레드 */
  }

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s;
  }
`;

// 4. 메뉴 리스트 (홈, 일정, 순위...)
export const MenuList = styled.div`
  display: flex;
  gap: 8px;
  background-color: ${(props) => props.theme.cardBg};
  padding: 4px;
  border-radius: 99px;
  border: 1px solid ${(props) => props.theme.border};

  /* 모바일에서는 숨김 (나중에 반응형 처리) */
  @media (max-width: 768px) {
    display: none;
  }
`;

// 5. 개별 메뉴 아이템 버튼
export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${(props) => props.$isActive ? props.theme.colors.primary : props.theme.subText};
  background-color: ${(props) => props.$isActive ? props.theme.bg : 'transparent'};
  transition: all 0.2s;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

// 6. 오른쪽 버튼 그룹 (테마 토글, 로그인)
export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ThemeButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.subText};
  background-color: ${(props) => props.theme.cardBg};
  border: 1px solid ${(props) => props.theme.border};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.colors.gold}; /* 호버 시 금색 */
  }
`;

export const LoginButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 6px rgba(225, 6, 0, 0.2);
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
    transform: translateY(-1px);
  }
`;