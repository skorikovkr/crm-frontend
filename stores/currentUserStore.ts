import { defineStore } from 'pinia'
import type { User } from '~/types/User';

export const useCurrentUserStore = defineStore({
  id: 'CurrentUserStore',
  state: () : { user: User | null } => ({
    user: null
  }),
  actions: {
    setUser(u: User | null) {
      if (u === null) {
        this.user = null;
      } else {
        this.user = {
          id: u.id,
          name: u.name,
          role: u.role,
          currentCompanyId: u.currentCompanyId,
          companies: u.companies
        };
      }
    }
  }
})
