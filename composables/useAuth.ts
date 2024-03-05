import type { LoginCredentials, RegisterCredentials, ResetPasswordCredentials } from "~/types/Auth";
import type { User } from "~/types/User";

// Value is initialized in: ~/plugins/auth.ts
export const useUser = <T = User>() => {
  return useState<T | undefined | null>("user", () => undefined);
};

export const useAuth = <T = User>() => {
  const router = useRouter();

  const user = useUser<T>();
  const isLoggedIn = computed(() => !!user.value);

  async function refresh() {
    try {
      user.value = await fetchCurrentUser();
    } catch {
      user.value = null;
    }
  }

  async function login(credentials: LoginCredentials) {
    if (isLoggedIn.value) return;

    await $laravelFetch("/login", { method: "post", body: credentials });
    await refresh();
  }

  async function register(credentials: RegisterCredentials) {
    await $laravelFetch("/register", { method: "post", body: credentials });
    await refresh();
  }

  async function resendEmailVerification() {
    return await $laravelFetch<{ status: string }>(
      "/email/verification-notification",
      {
        method: "post",
      }
    );
  }

  async function logout() {
    if (!isLoggedIn.value) return;

    await $laravelFetch("/logout", { method: "post" });
    user.value = null;

    await router.push("/login");
  }

  async function forgotPassword(email: string) {
    return await $laravelFetch<{ status: string }>("/forgot-password", {
      method: "post",
      body: { email },
    });
  }

  async function resetPassword(credentials: ResetPasswordCredentials) {
    return await $laravelFetch<{ status: string }>("/reset-password", {
      method: "post",
      body: credentials,
    });
  }

  return {
    user,
    isLoggedIn,
    login,
    register,
    resendEmailVerification,
    logout,
    forgotPassword,
    resetPassword,
    refresh,
  };
};

export const fetchCurrentUser = async <T = User>() => {
  try {
    return await $laravelFetch<T>("/api/user");
  } catch (error: any) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
};