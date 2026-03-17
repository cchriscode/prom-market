"use client";

import { notFound } from "next/navigation";
import { MOCK_SELLERS } from "@/shared/lib/mocks";
import { ProfileHeader } from "./ProfileHeader";
import { SellerPromptGrid } from "./SellerPromptGrid";

interface PublicProfileWidgetProps {
  username: string;
}

export function PublicProfileWidget({ username }: PublicProfileWidgetProps) {
  const user = MOCK_SELLERS.find((s) => s.username === username);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <ProfileHeader user={user} />
      <SellerPromptGrid sellerId={user.id} />
    </div>
  );
}
