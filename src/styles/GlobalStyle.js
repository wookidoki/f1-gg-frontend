// GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* 1. 구글 폰트 임포트 (속도감 있는 폰트: Titillium Web) */
  @import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700;900&display=swap');

  /* 2. 리셋 및 기본 설정 */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    /* F1 느낌의 폰트 적용 */
    font-family: 'Titillium Web', -apple-system, sans-serif;
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
    line-height: 1.5; /* 가독성 확보 */
  }

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

  /* 3. 스크롤바 커스텀 (조금 더 세련되게) */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.subText}; /* 너무 튀지 않게 보조색 사용 */
    border-radius: 10px;
    border: 2px solid ${(props) => props.theme.bg}; /* 스크롤바 주변 여백 효과 */
  }
  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.bg};
  }

  /* 4. 드래그 색상 변경 (깨알 디테일: F1 레드) */
  ::selection {
    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;
  }
`;

export default GlobalStyle;