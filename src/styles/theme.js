// theme.js

const common = {
  colors: {
    primary: '#e10600',       // F1 Red
    primaryHover: '#b30500',
    white: '#ffffff',
    black: '#000000',
    
    // 순위 메달
    gold: '#F7C600',
    silver: '#A5A5A5',
    bronze: '#CD7F32',

    // 🚦 F1 레이싱 플래그/상태 컬러 (분석용)
    success: '#2ecc71',       // Green Flag (기록 단축, 정상)
    warning: '#f1c40f',       // Yellow Flag (주의)
    danger: '#e74c3c',        // Red Flag (사고, 리타이어)
    info: '#3498db',          // Blue Flag (추월 허용)
    
    // 🏎️ 타이어 컴파운드 (데이터 시각화용)
    soft: '#ff3b30',          // Soft Tire (Red)
    medium: '#ffcc00',        // Medium Tire (Yellow)
    hard: '#f0f0f0',          // Hard Tire (White)
    inter: '#35bd00',         // Intermediate (Green)
    wet: '#0057e7',           // Wet (Blue)
  },
  
  // 📱 반응형 브레이크포인트 (모바일, 태블릿, 데스크탑)
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },

  // 📐 공통 레이아웃 수치
  borderRadius: {
    small: '8px',
    medium: '16px',
    large: '24px',
  }
};

export const lightTheme = {
  ...common,
  bg: '#f5f5f7',              // 애플 스타일 밝은 회색
  cardBg: '#ffffff',
  text: '#1d1d1f',            // 애플 스타일 텍스트
  subText: '#86868b',
  border: '#d2d2d7',
  navBg: 'rgba(255, 255, 255, 0.72)',
  shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  // 라이트 모드 전용
  cardHover: '#fafafa',
  inputBg: '#f5f5f7',
  accent: '#0071e3',          // 강조색 (링크, 버튼)
};

export const darkTheme = {
  ...common,
  bg: '#000000',              // 진정한 OLED 블랙
  cardBg: '#1c1c1e',          // 애플 스타일의 다크모드 카드색
  text: '#f5f5f7',
  subText: '#86868b',
  border: '#38383a',
  navBg: 'rgba(0, 0, 0, 0.72)',
  shadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
  // 다크 모드 전용
  cardHover: '#2c2c2e',
  inputBg: '#1c1c1e',
  accent: '#0a84ff',          // iOS 다크모드 블루
};