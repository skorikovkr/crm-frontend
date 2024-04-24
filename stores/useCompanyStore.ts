import { defineStore } from 'pinia'
import type { Company } from '~/types/Company';

export const useCompanyStore = defineStore(
  'company',
  () => {
    const current = ref<Company | null>(null);
    const userStore = useUserStore();

    const isUserInCompany = computed(() => {
        return !! userStore.user?.organizations.find(o => o.id === current.value?.id);
    });
    const logoAlt = computed(() => `Логотип компании ";${current.value?.name}";`);

    async function fetch(id: string|number) { 
      current.value = await $laravelFetch<Company>(`/api/organizations/${id}`, { method: "get" });
    }

    return {
      current,
      isUserInCompany,
      logoAlt,
      fetch
    };
  }
);