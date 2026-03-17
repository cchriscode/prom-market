import { RegisterForm } from "@/features/auth";

export const metadata = {
  title: "회원가입",
  description: "프롬마켓에 가입하고 AI 프롬프트를 구매·판매하세요.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <RegisterForm />
    </div>
  );
}
