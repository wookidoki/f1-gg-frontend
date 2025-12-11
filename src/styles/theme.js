//사이트 브랜드 컬러 및 다크/라이트 모드 색상 정의

const common = {
  colors: {
    primary: '#e10600', // F1 공식 레드
    primaryHover: '#b30500',
    white: '#ffffff',
    black: '#000000',
    gold: '#F7C600',   // 1등 금메달 색
    silver: '#A5A5A5', // 2등 은메달 색
    bronze: '#CD7F32', // 3등 동메달 색
  }
};

export const lightTheme = {
  ...common,
  bg: '#f8f9fa',        // 전체 배경색 (밝은 회색)
  cardBg: '#ffffff',    // 카드 배경색 (흰색)
  text: '#1f1f1f',      // 기본 글자색 (진한 회색)
  subText: '#6c757d',   // 보조 글자색 (연한 회색)
  border: '#e9ecef',    // 테두리 색
  navBg: 'rgba(255, 255, 255, 0.9)', // 네비게이션 반투명
};

export const darkTheme = {
  ...common,
  bg: '#101010',        // 전체 배경색 (거의 검정)
  cardBg: '#1e1e1e',    // 카드 배경색 (진한 회색)
  text: '#f1f1f1',      // 기본 글자색 (흰색에 가까움)
  subText: '#a0a0a0',   // 보조 글자색
  border: '#333333',    // 테두리 색
  navBg: 'rgba(18, 18, 18, 0.9)', // 네비게이션 반투명
};

//... Spread Operator(전개연산자) 객체의 내용을 복붙 