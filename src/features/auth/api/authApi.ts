// TODO: API 연동
export async function login(email: string, password: string) {
  return { token: "", user: null };
}

export async function register(email: string, password: string, name: string) {
  return { token: "", user: null };
}

export async function socialLogin(provider: "google" | "github") {
  return { redirectUrl: "" };
}

export async function logout() {
  return { success: true };
}

export async function getCurrentUser() {
  return null;
}
