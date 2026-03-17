export interface ChatConversation {
  id: string;
  otherUserId: string;
  otherUsername: string;
  otherAvatar?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export const MOCK_CONVERSATIONS: ChatConversation[] = [
  { id: "conv-01", otherUserId: "user-b01", otherUsername: "startup_kim", lastMessage: "로고 프롬프트 커스텀 의뢰 가능한가요?", lastMessageAt: "2026-03-17T08:00:00Z", unreadCount: 2 },
  { id: "conv-02", otherUserId: "user-b06", otherUsername: "dungeon_master", lastMessage: "감사합니다! 결과물이 정말 좋았어요.", lastMessageAt: "2026-03-16T22:00:00Z", unreadCount: 0 },
  { id: "conv-03", otherUserId: "user-b08", otherUsername: "blogger_park", lastMessage: "SEO 프롬프트에 대해 질문이 있어요.", lastMessageAt: "2026-03-16T15:30:00Z", unreadCount: 1 },
  { id: "conv-04", otherUserId: "user-b12", otherUsername: "ceo_young", lastMessage: "사업계획서 프롬프트 잘 사용했습니다.", lastMessageAt: "2026-03-15T10:00:00Z", unreadCount: 0 },
];

export const MOCK_MESSAGES: ChatMessage[] = [
  // conv-01
  { id: "msg-01", conversationId: "conv-01", senderId: "user-b01", text: "안녕하세요! 로고 프롬프트를 구매했는데요.", createdAt: "2026-03-17T07:30:00Z" },
  { id: "msg-02", conversationId: "conv-01", senderId: "user-s01", text: "안녕하세요! 무엇을 도와드릴까요?", createdAt: "2026-03-17T07:35:00Z" },
  { id: "msg-03", conversationId: "conv-01", senderId: "user-b01", text: "로고 프롬프트 커스텀 의뢰 가능한가요? 저희 브랜드에 맞게 변수를 조정하고 싶어요.", createdAt: "2026-03-17T08:00:00Z" },
  // conv-02
  { id: "msg-04", conversationId: "conv-02", senderId: "user-b06", text: "판타지 캐릭터 프롬프트로 D&D 파티 전체를 만들었어요!", createdAt: "2026-03-16T21:00:00Z" },
  { id: "msg-05", conversationId: "conv-02", senderId: "user-s01", text: "정말요? 결과물이 궁금하네요! 공유해주실 수 있나요?", createdAt: "2026-03-16T21:30:00Z" },
  { id: "msg-06", conversationId: "conv-02", senderId: "user-b06", text: "감사합니다! 결과물이 정말 좋았어요.", createdAt: "2026-03-16T22:00:00Z" },
  // conv-03
  { id: "msg-07", conversationId: "conv-03", senderId: "user-b08", text: "SEO 프롬프트에 대해 질문이 있어요. 키워드 밀도는 어떻게 조절하나요?", createdAt: "2026-03-16T15:30:00Z" },
  // conv-04
  { id: "msg-08", conversationId: "conv-04", senderId: "user-b12", text: "사업계획서 프롬프트 잘 사용했습니다. 투자 유치에 큰 도움이 됐어요!", createdAt: "2026-03-15T09:30:00Z" },
  { id: "msg-09", conversationId: "conv-04", senderId: "user-s01", text: "좋은 소식이네요! 다른 프롬프트도 추천드릴까요?", createdAt: "2026-03-15T10:00:00Z" },
];
