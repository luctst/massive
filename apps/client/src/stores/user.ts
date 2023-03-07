import { defineStore } from 'pinia';
import { UserStore } from '@/types/index';
import { ReqAxiosNewUser } from '@/types/index';
import http from '@/utils/http';

export interface Store {
  user: UserStore | null;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): Store => {
    return {
      user: null,
    };
  },
  actions: {
    async registerUser(newUserData: ReqAxiosNewUser) {
      try {
        const { data } = await http.post('/auth/local/register', newUserData);
        this.user = {
          ...data.user,
          jwt: data.jwt,
        };
      } catch (error) {
        // TODO: Handle error
        throw error;
      }
    }
  },
});
