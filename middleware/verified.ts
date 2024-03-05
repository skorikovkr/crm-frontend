export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore();

  if (!userStore.isLoggedIn) return navigateTo("/login");

  // @ts-ignore
  if (!(userStore.user.email_verified_at || userStore.user.is_verified))
    return navigateTo("/verify-email");
});