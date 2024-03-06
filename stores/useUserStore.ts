import { defineStore } from 'pinia'
import type { User } from '~/types/User';
import type { LoginCredentials, RegisterCredentials, ResetPasswordCredentials } from "~/types/Auth";

// Value is initialized in: ~/plugins/auth.ts
export const useUserStore = defineStore(
  'user', 
  () => {
    const user = ref<User | null | undefined>(undefined);
    const router = useRouter();

    const isLoggedIn = computed(() => !!user.value);

    const refresh = async () => {
      try {
        user.value = await $laravelFetch<User>("/api/user");
      } catch (error: any) {
        if ([401, 419].includes(error?.response?.status))
          user.value = null;
        else
          throw error;
      }
    };

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
      user.value = null;
      await $laravelFetch("/logout", { method: "post" });
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
  }
);
