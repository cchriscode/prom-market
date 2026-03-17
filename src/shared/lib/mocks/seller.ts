export interface DailyStat {
  date: string;
  sales: number;
  revenue: number;
  views: number;
}

export interface Payout {
  id: string;
  amount: number;
  status: "COMPLETED" | "PENDING" | "PROCESSING";
  method: string;
  createdAt: string;
}

export const MOCK_DAILY_STATS: DailyStat[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 2, i + 1);
  return {
    date: date.toISOString().split("T")[0],
    sales: Math.floor(Math.random() * 15) + 2,
    revenue: Math.floor(Math.random() * 80 + 10) * 100 / 100,
    views: Math.floor(Math.random() * 500) + 50,
  };
});

export const MOCK_PAYOUTS: Payout[] = [
  { id: "pay-01", amount: 1250.00, status: "COMPLETED", method: "Stripe", createdAt: "2026-02-15T10:00:00Z" },
  { id: "pay-02", amount: 980.50, status: "COMPLETED", method: "Stripe", createdAt: "2026-01-15T10:00:00Z" },
  { id: "pay-03", amount: 1420.00, status: "COMPLETED", method: "Stripe", createdAt: "2025-12-15T10:00:00Z" },
  { id: "pay-04", amount: 750.25, status: "PROCESSING", method: "Stripe", createdAt: "2026-03-01T10:00:00Z" },
  { id: "pay-05", amount: 340.00, status: "PENDING", method: "Stripe", createdAt: "2026-03-15T10:00:00Z" },
];
