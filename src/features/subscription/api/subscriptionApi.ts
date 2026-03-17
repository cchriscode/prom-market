// TODO: API 연동
export async function createSubscription(plan: "basic" | "pro") {
  return { sessionUrl: "" };
}

export async function cancelSubscription() {
  return { success: true };
}

export async function getSubscriptionStatus() {
  return { isSubscribed: false, plan: null, downloadsLeft: 0, creditsLeft: 0 };
}

export async function selectDownload(promptId: string) {
  return { success: true };
}

export async function topUp(downloads: number) {
  return { sessionUrl: "" };
}
