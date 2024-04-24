export default defineNuxtRouteMiddleware(async (to) => {
  const companyStore = useCompanyStore();
  companyStore.fetch(to.params.id[0]);
})
