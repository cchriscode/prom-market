import { CartWidget } from "@/widgets/cart";

export const metadata = {
  title: "장바구니 — 프롬마켓",
  description: "장바구니 — 결제 진행",
};

export default function CartPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">장바구니</h1>
      <CartWidget />
    </div>
  );
}
