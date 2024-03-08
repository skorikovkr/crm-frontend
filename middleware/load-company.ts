import type { Company } from '~/types/Company';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data } = await useFetch<Company>(`/api/company/${to.params.id}`);
  
  if (!data) {
    showError({
      statusCode: 404,
      statusMessage: 'Организация не найдена.'
    })
  }
  
  const companyStore = useCompanyStore();
  companyStore.current = data.value;
})
