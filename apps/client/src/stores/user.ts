import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { UserStore } from '@/types/index';
import { ReqAxiosNewUser } from '@/types/index';
import http from '@/utils/http';

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
  getters: {
    getUserInitialsLetters(state): (user: UserStore) => string {
      return (user: UserStore) => {
        if (!state.user) return '';
        if (user.provider === 'google') {
          return user.username.split('.').map((word) => word[0].toUpperCase()).join('');
        }
  
        return user.firstname[0].toUpperCase() + user.lastname[0].toUpperCase();
      };
    },
  },
  actions: {
    setJwt(jwt: string): void {
      this.user = {
        jwt,
      };
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
        const { data } = await http.get(`/users/me?populate=deep`, {
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
