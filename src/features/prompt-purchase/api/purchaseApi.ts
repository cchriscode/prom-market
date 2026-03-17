// TODO: API 연동
export async function createCheckoutSession(promptIds: string[]) {
  return { sessionUrl: "" };
}

export async function getPurchases() {
  return [];
}

export async function getPromptContent(promptId: string) {
  return { text: "" };
}

export async function getInvoice(purchaseId: string) {
  return { pdfUrl: "" };
}
