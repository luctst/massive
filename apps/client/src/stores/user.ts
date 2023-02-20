import { defineStore } from 'pinia';
import { UserStore } from '@/types/index';
import PP from '@/assets/profil-pic1.svg';
import BG from '@/assets/Rectangle24.svg';

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserStore => ({
    id: 0,
    isConnected: true,
    firstname: 'John',
    lastname: 'Doe',
    avatar: PP,
    followers: [],
    profilBackground: BG,
    bookmarks: [],
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }),
});
