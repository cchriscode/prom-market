// TODO: API 연동
export async function getDashboardStats() {
  return { totalSales: 0, totalRevenue: 0, totalViews: 0 };
}

export async function getAnalytics(params: { from?: string; to?: string }) {
  return { daily: [] };
}

export async function getPayouts() {
  return [];
}

export async function requestPayout() {
  return { success: true };
}
