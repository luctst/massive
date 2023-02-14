import { defineStore } from 'pinia';
import { UserStore } from '@/types/index';
import PP from '@/assets/profil-pic1.svg';

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserStore => ({
    id: 0,
    isConnected: true,
    firstname: 'John',
    lastname: 'Doe',
    avatar: PP,
    bookmarks: [],
  }),
});
