import { defineStore } from 'pinia'
import type { User } from '~/types/User';

export const useMyCurrentUserStore = defineStore({
  id: 'CurrentUserStore',
  state: () : { user: User | null } => ({
    user: null
  }),
  actions: {
    setUser(id: number, name: string) {
      this.user = {
        id,
        name
      };
    }
  }
})
