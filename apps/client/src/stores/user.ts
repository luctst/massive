import { defineStore } from 'pinia';
import { UserStore } from '@/types/index';
import mocks from '@/mocks/index';

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserStore => mocks.user1,
});
