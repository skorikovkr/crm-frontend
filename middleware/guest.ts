export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore();
  if (userStore.isLoggedIn) return navigateTo("/", { replace: true });
});