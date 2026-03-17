"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/shared/ui/dialog";
import { useSubscription } from "../model/useSubscription";

const TOP_UP_OPTIONS = [
  { downloads: 5, price: "₩5,900" },
  { downloads: 10, price: "₩9,900" },
  { downloads: 25, price: "₩19,900" },
];

export function TopUpDialog() {
  const { isSubscribed, topUp } = useSubscription();
  const [selected, setSelected] = useState(1);

  if (!isSubscribed) return null;

  const handleTopUp = () => {
    topUp(TOP_UP_OPTIONS[selected].downloads);
    toast.success(`${TOP_UP_OPTIONS[selected].downloads}회 다운로드가 추가되었습니다.`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Plus className="h-3.5 w-3.5" />
          Top Up
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>다운로드 충전</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {TOP_UP_OPTIONS.map((option, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg border p-4 transition-colors",
                selected === i
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-accent"
              )}
            >
              <span className="text-sm font-medium">{option.downloads}회 다운로드</span>
              <span className="text-sm font-bold">{option.price}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleTopUp}>충전하기</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
