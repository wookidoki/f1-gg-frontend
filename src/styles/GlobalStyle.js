import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* 1. 리셋 CSS (기본 여백 제거) */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 2. 기본 폰트 및 배경 설정 */
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.text};
    transition: background-color 0.3s ease, color 0.3s ease; /* 다크모드 전환 시 부드럽게 */
    overflow-x: hidden; /* 가로 스크롤 방지 */
  }

  /* 3. 링크 및 버튼 스타일 초기화 */
  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  /* 4. 스크롤바 디자인 (크롬/사파리) */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.bg};
  }
`;

export default GlobalStyle;