import type { Review } from "@/entities/review/model/types";

export const MOCK_REVIEWS: Review[] = [
  // p-01 Minimalist Logo Design
  { id: "r-01", rating: 5, comment: "완벽한 로고 프롬프트! 결과물이 정말 깔끔하고 세련됩니다. 스타트업 로고에 바로 사용했어요.", userId: "user-b01", username: "startup_kim", promptId: "p-01", createdAt: "2025-08-10T10:00:00Z" },
  { id: "r-02", rating: 5, comment: "미니멀한 스타일이 딱 제가 원하던 거였어요. 변수 조절로 다양한 변형도 가능합니다.", userId: "user-b02", username: "brandmaker", promptId: "p-01", createdAt: "2025-09-01T14:30:00Z" },
  { id: "r-03", rating: 4, comment: "대체로 만족하지만 가끔 텍스트 렌더링이 불안정할 때가 있어요.", userId: "user-b03", username: "freelancer_j", promptId: "p-01", createdAt: "2025-10-05T09:15:00Z" },

  // p-02 Professional Headshot
  { id: "r-04", rating: 5, comment: "LinkedIn 프로필 사진을 이걸로 만들었는데 동료들이 스튜디오에서 찍은 줄 알았어요!", userId: "user-b04", username: "jobseeker99", promptId: "p-02", createdAt: "2025-07-20T11:00:00Z" },
  { id: "r-05", rating: 4, comment: "배경 처리가 깔끔하고 조명 표현이 좋습니다. 약간의 후보정은 필요합니다.", userId: "user-b05", username: "hr_specialist", promptId: "p-02", createdAt: "2025-08-15T16:45:00Z" },

  // p-03 Fantasy Character Creator
  { id: "r-06", rating: 5, comment: "D&D 캐릭터를 매번 이걸로 생성합니다. 디테일이 미쳤어요.", userId: "user-b06", username: "dungeon_master", promptId: "p-03", createdAt: "2025-06-10T20:00:00Z" },
  { id: "r-07", rating: 5, comment: "게임 개발용 컨셉 아트로 사용 중입니다. 일관된 스타일이 유지돼서 좋아요.", userId: "user-b07", username: "indie_dev", promptId: "p-03", createdAt: "2025-07-22T13:30:00Z" },
  { id: "r-08", rating: 5, comment: "갑옷과 무기 디테일이 환상적입니다. 10/10.", userId: "user-b03", username: "freelancer_j", promptId: "p-03", createdAt: "2025-08-01T09:00:00Z" },

  // p-05 SEO Blog Post Writer
  { id: "r-09", rating: 5, comment: "블로그 트래픽이 200% 증가했습니다. SEO 구조가 정말 탁월해요.", userId: "user-b08", username: "blogger_park", promptId: "p-05", createdAt: "2025-04-15T10:00:00Z" },
  { id: "r-10", rating: 4, comment: "키워드 배치가 자연스럽고 메타 디스크립션도 자동 생성돼서 편리합니다.", userId: "user-b09", username: "content_lee", promptId: "p-05", createdAt: "2025-05-20T15:30:00Z" },
  { id: "r-11", rating: 5, comment: "마케팅팀 전체가 사용 중입니다. 시간이 엄청 절약됩니다.", userId: "user-b10", username: "marketing_pro", promptId: "p-05", createdAt: "2025-06-30T12:00:00Z" },

  // p-08 Product Photography Mockup
  { id: "r-12", rating: 5, comment: "쇼핑몰 상품 이미지를 이걸로 전부 교체했습니다. 퀄리티가 실제 촬영 수준이에요.", userId: "user-b01", username: "startup_kim", promptId: "p-08", createdAt: "2025-05-10T10:00:00Z" },
  { id: "r-13", rating: 4, comment: "조명 표현이 좋지만 특정 제품 형태에서는 미세한 조정이 필요합니다.", userId: "user-b11", username: "ecommerce_choi", promptId: "p-08", createdAt: "2025-06-25T14:00:00Z" },

  // p-16 Business Plan Generator
  { id: "r-14", rating: 5, comment: "투자자 미팅 준비에 큰 도움이 됐습니다. 재무 예측 부분이 특히 좋아요.", userId: "user-b12", username: "ceo_young", promptId: "p-16", createdAt: "2025-03-20T09:00:00Z" },
  { id: "r-15", rating: 5, comment: "경쟁사 분석 섹션이 매우 체계적입니다. 실제 IR 자료에 바로 활용 가능합니다.", userId: "user-b04", username: "jobseeker99", promptId: "p-16", createdAt: "2025-04-10T16:30:00Z" },

  // p-22 Free Basic Portrait
  { id: "r-16", rating: 4, comment: "무료치고 정말 괜찮습니다. 입문용으로 추천해요.", userId: "user-b13", username: "ai_beginner", promptId: "p-22", createdAt: "2025-01-15T10:00:00Z" },
  { id: "r-17", rating: 3, comment: "기본적인 수준이지만 무료라서 불만은 없어요.", userId: "user-b14", username: "casual_user", promptId: "p-22", createdAt: "2025-02-20T11:30:00Z" },
  { id: "r-18", rating: 5, comment: "무료 프롬프트 중 최고입니다! 이걸로 AI 포트레이트에 입문했어요.", userId: "user-b06", username: "dungeon_master", promptId: "p-22", createdAt: "2025-03-10T08:00:00Z" },

  // p-25 Cyberpunk Cityscape
  { id: "r-19", rating: 5, comment: "사이버펑크 분위기가 완벽합니다. 네온 조명과 빗물 반사가 정말 리얼해요.", userId: "user-b07", username: "indie_dev", promptId: "p-25", createdAt: "2025-06-15T19:00:00Z" },
  { id: "r-20", rating: 4, comment: "배경화면으로 쓰기 딱 좋습니다. 다양한 앵글 설정이 가능해요.", userId: "user-b15", username: "wallpaper_fan", promptId: "p-25", createdAt: "2025-07-30T22:00:00Z" },
];
