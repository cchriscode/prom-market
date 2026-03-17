"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";

export function SettingsForm() {
  const [form, setForm] = useState({
    name: "Design Pro",
    username: "designpro",
    email: "designpro@example.com",
    bio: "10년차 그래픽 디자이너. 브랜딩과 로고 전문 프롬프트를 만듭니다.",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-lg space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold">이름</label>
        <Input value={form.name} onChange={(e) => update("name", e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">사용자명</label>
        <Input value={form.username} onChange={(e) => update("username", e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">이메일</label>
        <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">소개</label>
        <Textarea
          rows={3}
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
        />
      </div>

      <Button onClick={() => toast.success("설정이 저장되었습니다.")}>
        저장
      </Button>
    </div>
  );
}
