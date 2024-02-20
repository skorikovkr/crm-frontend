import { defineStore } from 'pinia'
import type { Company } from '~/types/Company';

export const useCompaniesStore = defineStore({
  id: 'CompaniesStore',
  state: () : { companies: Company[] } => ({
    companies: []
  }),
  actions: {
    setCompanies(c: Company[]) {
      this.companies = c;
    }
  }
})
