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
  bg: '#f3f4f6',              // 너무 쨍한 흰색보다 살짝 톤다운된 쿨그레이 추천
  cardBg: '#ffffff',
  text: '#111827',            // 완전 검정보다 짙은 회색이 눈이 편함
  subText: '#6b7280',
  border: '#e5e7eb',
  navBg: 'rgba(255, 255, 255, 0.85)',
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // 부드러운 그림자
};

export const darkTheme = {
  ...common,
  bg: '#111111',              // 완전 검정(#000)보다는 #111 추천 (눈 피로 감소)
  cardBg: '#1c1c1e',          // 애플 스타일의 다크모드 카드색
  text: '#f9fafb',
  subText: '#9ca3af',
  border: '#2d2d2d',
  navBg: 'rgba(28, 28, 30, 0.85)',
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)', // 다크모드는 그림자가 더 진해야 티가 남
};