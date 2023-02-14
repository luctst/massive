import { defineStore } from 'pinia';
import { UserStore } from '@/types/index';

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserStore => ({
    isConnected: true,
    firstname: '',
    lastname: '',
    avatar: null,
  }),
});
