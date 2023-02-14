import { defineStore } from 'pinia';
import { UserStore } from '@/types/index';

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserStore => ({
    id: 0,
    isConnected: true,
    firstname: '',
    lastname: '',
    avatar: null,
    bookmarks: null,
  }),
});
