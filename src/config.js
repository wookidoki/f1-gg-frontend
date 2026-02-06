// 1. API 기본 주소 (나중에 배포하면 여기만 바꾸면 됨)
export const API_BASE_URL = "http://localhost:8082/api/v1";

// 2. 국적(Nationality) -> 국기 이모지 변환 헬퍼 함수
// F1 API는 "Dutch", "British" 처럼 형용사로 줘서 매핑이 필요합니다.
export const getFlagEmoji = (nationality) => {
  const flags = {
    "Dutch": "🇳🇱",
    "British": "🇬🇧",
    "Spanish": "🇪🇸",
    "Monegasque": "🇲🇨",
    "Mexican": "🇲🇽",
    "Australian": "🇦🇺",
    "American": "🇺🇸",
    "Canadian": "🇨🇦",
    "French": "🇫🇷",
    "German": "🇩🇪",
    "Japanese": "🇯🇵",
    "Chinese": "🇨🇳",
    "Thai": "🇹🇭",
    "Finnish": "🇫🇮",
    "Danish": "🇩🇰",
    "Brazilian": "🇧🇷"
  };
  return flags[nationality] || "🏳️"; // 없으면 흰 깃발
};