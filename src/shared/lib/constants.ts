export const LAYOUT = {
  SIDEBAR_EXPANDED: 240,
  SIDEBAR_COLLAPSED: 64,
  TOPBAR_HEIGHT: 56,
  CONTENT_MAX_WIDTH: 1280,
} as const;

export const AI_MODELS = [
  { id: "midjourney", label: "Midjourney", emoji: "⛵", bgColor: "bg-blue-50" },
  { id: "chatgpt-image", label: "ChatGPT Image", emoji: "🖌️", bgColor: "bg-green-50" },
  { id: "gemini-image", label: "Gemini Image", emoji: "🍌", bgColor: "bg-yellow-50" },
  { id: "dall-e", label: "DALL·E", emoji: "🎨", bgColor: "bg-pink-50" },
  { id: "stable-diffusion", label: "Stable Diffusion", emoji: "🖼️", bgColor: "bg-purple-50" },
  { id: "claude", label: "Claude", emoji: "🤖", bgColor: "bg-orange-50" },
  { id: "flux", label: "FLUX", emoji: "⚡", bgColor: "bg-cyan-50" },
  { id: "veo", label: "Veo", emoji: "✨", bgColor: "bg-indigo-50" },
  { id: "sora", label: "Sora", emoji: "🎬", bgColor: "bg-rose-50" },
  { id: "chatgpt", label: "ChatGPT", emoji: "💬", bgColor: "bg-emerald-50" },
  { id: "grok", label: "Grok", emoji: "✖️", bgColor: "bg-gray-50" },
] as const;

export const SELLER_TIERS = {
  DIAMOND: { label: "Diamond", emoji: "💎", color: "text-seller-diamond", bg: "bg-seller-diamond-bg" },
  GOLD: { label: "Gold", emoji: "🥇", color: "text-seller-gold", bg: "bg-seller-gold-bg" },
  SILVER: { label: "Silver", emoji: "🥈", color: "text-seller-silver", bg: "bg-seller-silver-bg" },
  BRONZE: { label: "Bronze", emoji: "🥉", color: "text-seller-bronze", bg: "bg-seller-bronze-bg" },
} as const;
