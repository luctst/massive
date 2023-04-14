import { AxiosError } from 'axios';
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
    async setUser(): Promise<void> {
      try {
        const { data } = await http.get('/users/me?populate[media][populate]=*&populate[likes][populate]=*&populate[followers][populate]=*&populate[following][populate]=*&populate[articles][populate]=*', {
          headers: {
            Authorization: `Bearer ${this.user?.jwt}`,
          },
        });
        this.user = {
          ...this.user,
          ...data,
        };
      } catch (error: AxiosError | any) {
        throw error;
      }
    },
    async authUser(userId: { email: string; password: string }): Promise<boolean | AxiosError> {
      try {
        const { data } = await http.post('/auth/local', { identifier: userId.email, password: userId.password });
        this.user = {
          jwt: data.jwt,
        };
        return true;
      } catch (error: AxiosError | any) {
        return error;
      }
    },
    async registerUser(newUserData: ReqAxiosNewUser): Promise<boolean | AxiosError> {
      try {
        const { data } = await http.post('/auth/local/register', newUserData);
        this.user = {
          jwt: data.jwt,
        };

      return true;
      } catch (error: AxiosError | any) {
        return error;
      }
    }
  },
});
