import { PublicProfileWidget } from "@/widgets/profile";

export const metadata = {
  title: "프로필 — 프롬마켓",
};

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return <PublicProfileWidget username={username} />;
}
