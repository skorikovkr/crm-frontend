export default defineNuxtPlugin(async () => {
  const userStore = useUserStore();
  if (userStore.isLoggedIn) return;
  userStore.refresh();
});