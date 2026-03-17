// TODO: API 연동
export async function createPrompt(data: Record<string, unknown>) {
  return { id: "", slug: "" };
}

export async function updatePrompt(id: string, data: Record<string, unknown>) {
  return { success: true };
}

export async function deletePrompt(id: string) {
  return { success: true };
}

export async function uploadImage(file: File) {
  return { url: "" };
}
