import {
  Home,
  ShoppingBag,
  Search,
  Upload,
  Briefcase,
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
    ],
  },
];

export const BOTTOM_NAV: NavItem = {
  label: "채팅",
  href: "/chat",
  icon: MessageCircle,
};
