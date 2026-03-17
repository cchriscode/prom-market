"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";
import { PurchasesList } from "./PurchasesList";
import { MyPromptsList } from "./MyPromptsList";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { PayoutSection } from "./PayoutSection";
import { SubscriptionSection } from "./SubscriptionSection";
import { SettingsForm } from "./SettingsForm";

export function AccountWidget() {
  return (
    <Tabs defaultValue="purchases">
      <TabsList variant="line" className="w-full justify-start">
        <TabsTrigger value="purchases">구매 내역</TabsTrigger>
        <TabsTrigger value="prompts">내 프롬프트</TabsTrigger>
        <TabsTrigger value="analytics">판매 분석</TabsTrigger>
        <TabsTrigger value="payouts">정산</TabsTrigger>
        <TabsTrigger value="subscription">Select 구독</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>

      <TabsContent value="purchases" className="pt-4">
        <PurchasesList />
      </TabsContent>

      <TabsContent value="prompts" className="pt-4">
        <MyPromptsList />
      </TabsContent>

      <TabsContent value="analytics" className="pt-4">
        <AnalyticsDashboard />
      </TabsContent>

      <TabsContent value="payouts" className="pt-4">
        <PayoutSection />
      </TabsContent>

      <TabsContent value="subscription" className="pt-4">
        <SubscriptionSection />
      </TabsContent>

      <TabsContent value="settings" className="pt-4">
        <SettingsForm />
      </TabsContent>
    </Tabs>
  );
}
