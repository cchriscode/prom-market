import {
  Home,
  ShoppingBag,
  Search,
  Upload,
  Briefcase,
  Palette,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavSection {
  title: string;
  items: NavItem[];
  hideWhenCollapsed?: boolean;
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "메인",
    items: [
      { label: "홈", href: "/", icon: Home },
      { label: "마켓플레이스", href: "/marketplace", icon: ShoppingBag },
      { label: "검색", href: "/search", icon: Search },
    ],
  },
  {
    title: "크리에이터",
    items: [
      { label: "프롬프트 판매", href: "/sell", icon: Upload },
      { label: "Hire", href: "/hire", icon: Briefcase },
      { label: "앱 빌더", href: "/create", icon: Palette },
    ],
  },
];

export interface ModelShortcut {
  id: string;
  label: string;
  emoji: string;
  href: string;
}

export const MODEL_SHORTCUTS: ModelShortcut[] = [
  { id: "midjourney", label: "Midjourney", emoji: "⛵", href: "/marketplace?model=midjourney" },
  { id: "chatgpt-image", label: "ChatGPT Image", emoji: "🖌️", href: "/marketplace?model=chatgpt-image" },
  { id: "gemini-image", label: "Gemini Image", emoji: "🍌", href: "/marketplace?model=gemini-image" },
  { id: "veo", label: "Veo", emoji: "✨", href: "/marketplace?model=veo" },
  { id: "flux", label: "FLUX", emoji: "⚡", href: "/marketplace?model=flux" },
];

export const BOTTOM_NAV: NavItem = {
  label: "채팅",
  href: "/chat",
  icon: MessageCircle,
};
