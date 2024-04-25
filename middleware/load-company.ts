export default defineNuxtRouteMiddleware(async (to) => {
  const companyStore = useCompanyStore();
  await companyStore.fetch(to.params.id[0]);
})
