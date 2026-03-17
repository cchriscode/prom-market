import type { Category } from "@/entities/category/model/types";

export const MOCK_CATEGORIES: Category[] = [
  // Top 15 — 홈페이지 CategoryGrid에 표시
  { id: "cat-01", name: "Logo", slug: "logo", icon: "🎯", promptCount: 1240 },
  { id: "cat-02", name: "Art", slug: "art", icon: "🖼️", promptCount: 3420 },
  { id: "cat-03", name: "Photography", slug: "photography", icon: "📷", promptCount: 1870 },
  { id: "cat-04", name: "Marketing", slug: "marketing", icon: "📢", promptCount: 1580 },
  { id: "cat-05", name: "Business", slug: "business", icon: "💼", promptCount: 1320 },
  { id: "cat-06", name: "Code", slug: "code", icon: "💻", promptCount: 960 },
  { id: "cat-07", name: "Writing", slug: "writing", icon: "✍️", promptCount: 2450 },
  { id: "cat-08", name: "Illustration", slug: "illustration", icon: "🎨", promptCount: 2150 },
  { id: "cat-09", name: "3D", slug: "3d", icon: "🧊", promptCount: 1340 },
  { id: "cat-10", name: "Animation", slug: "animation", icon: "🎬", promptCount: 420 },
  { id: "cat-11", name: "Fashion", slug: "fashion", icon: "👗", promptCount: 870 },
  { id: "cat-12", name: "Interior", slug: "interior", icon: "🛋️", promptCount: 730 },
  { id: "cat-13", name: "Gaming", slug: "gaming", icon: "🎮", promptCount: 1560 },
  { id: "cat-14", name: "Social", slug: "social", icon: "📱", promptCount: 1890 },
  { id: "cat-15", name: "SEO", slug: "seo", icon: "🔍", promptCount: 1100 },

  // Bottom 15 — 마켓플레이스 필터에서만 사용
  { id: "cat-16", name: "Icon", slug: "icon", icon: "✨", promptCount: 890 },
  { id: "cat-17", name: "Abstract", slug: "abstract", icon: "🌀", promptCount: 980 },
  { id: "cat-18", name: "Character", slug: "character", icon: "🧙", promptCount: 2890 },
  { id: "cat-19", name: "Landscape", slug: "landscape", icon: "🏔️", promptCount: 1560 },
  { id: "cat-20", name: "Portrait", slug: "portrait", icon: "👤", promptCount: 1920 },
  { id: "cat-21", name: "Product", slug: "product", icon: "📦", promptCount: 1110 },
  { id: "cat-22", name: "Pattern", slug: "pattern", icon: "🔷", promptCount: 680 },
  { id: "cat-23", name: "Architecture", slug: "architecture", icon: "🏛️", promptCount: 730 },
  { id: "cat-24", name: "Food", slug: "food", icon: "🍕", promptCount: 640 },
  { id: "cat-25", name: "Email", slug: "email", icon: "📧", promptCount: 540 },
  { id: "cat-26", name: "Ads", slug: "ads", icon: "📰", promptCount: 760 },
  { id: "cat-27", name: "Poster", slug: "poster", icon: "🪧", promptCount: 520 },
  { id: "cat-28", name: "Sticker", slug: "sticker", icon: "🏷️", promptCount: 430 },
  { id: "cat-29", name: "Anime", slug: "anime", icon: "🎌", promptCount: 2100 },
  { id: "cat-30", name: "Cyberpunk", slug: "cyberpunk", icon: "🌃", promptCount: 950 },
];
