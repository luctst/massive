import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import qs from 'qs';
import { UserStore } from '@/types/index';
import { ReqAxiosNewUser } from '@/types/index';
import http from '@/utils/http';
import utils from '@/utils/index';

export interface Store {
  user: UserStore | null;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): Store => {
    return {
      user: null,
    };
  },
  actions: {
    setUserManually(userData: UserStore): void {
      this.user = userData;
    },
    removeUser(): void {
      this.user = null;
    },
    updateUser(newUserData: { avatar_url: string; email: string; username: string }): void {
      Object.keys(newUserData).forEach((key) => {
        this.user[key] = newUserData[key];
      });
    },
    async setUser(): Promise<void> {
      try {
        const paramsArticles = qs.stringify(
          { 
            populate: utils.populateUsersData,
          });
        const { data } = await http.get(`/users/me?${paramsArticles}`, {
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
