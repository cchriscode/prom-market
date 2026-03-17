// TODO: API 연동
export async function searchPrompts(params: {
  q?: string;
  category?: string;
  model?: string;
  type?: string;
  sort?: string;
  page?: number;
}) {
  return { prompts: [], total: 0 };
}

export async function getCategories() {
  return [];
}

export async function getModels() {
  return [];
}
