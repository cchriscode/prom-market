export function formatPrice(price: number, currency: string = "USD"): string {
  if (price === 0) return "Free";
  if (currency === "KRW") {
    return `₩${price.toLocaleString("ko-KR")}`;
  }
  return `$${price.toFixed(2)}`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
