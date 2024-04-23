import type { Company } from '~/types/Company';

export default defineNuxtRouteMiddleware(async (to) => {
  const { data } = await useLaravelFetch<Company>(`/api/organizations/${to.params.id}`);
  const companyStore = useCompanyStore();
  
  if (!data) {
    companyStore.current = null;
    showError({
      statusCode: 404,
      statusMessage: 'Организация не найдена.'
    })
  }
  
  companyStore.current = data.value;
})
