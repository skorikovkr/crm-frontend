import { defineStore } from 'pinia'
import type { Company } from '~/types/Company';

export const useCompanyStore = defineStore(
  'company',
  () => {
    const current = ref<Company | null>(null);
    const userStore = useUserStore();

    const isUserInCompany = computed(() => true);

    async function fetch(id: number) {
      //current.value = await $laravelFetch<Company>(`/company/${id}`, { method: "get" });
      current.value = await $fetch<Company | null>(`/api/company/${id}`);
    }

    return {
      current,
      isUserInCompany,
      fetch
    };
  }
);