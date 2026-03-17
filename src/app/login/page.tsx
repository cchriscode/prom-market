import { LoginForm } from "@/features/auth";

export const metadata = {
  title: "로그인",
  description: "프롬마켓에 로그인하세요.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <LoginForm />
    </div>
  );
}
