import { defineStore } from 'pinia';

export const useAuth = defineStore('auth', {
  state: () => ({
    token: null,
  }),
  actions: {
    authenticate(data: any) {
      this.token = data.access_token;
    },
  },
});