export default defineNuxtPlugin(async () => {
  const userStore = useUserStore();
  if (userStore.isLoggedIn) return;
  await userStore.refresh();
});