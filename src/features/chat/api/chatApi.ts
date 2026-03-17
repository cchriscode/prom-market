// TODO: API 연동
export async function getConversations() {
  return [];
}

export async function getMessages(conversationId: string) {
  return [];
}

export async function sendMessage(conversationId: string, text: string) {
  return { id: "" };
}

export async function startConversation(userId: string, text: string) {
  return { conversationId: "" };
}
