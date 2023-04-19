import { AxiosError, ParamsSerializerOptions } from 'axios';
import { defineStore } from 'pinia';
import qs from 'qs';
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
  actions: {
    async setUser(): Promise<void> {
      try {
        const paramsArticles = qs.stringify(
          { 
            populate: ['followings', 'followings.articles', 'followings.articles.user', 'followings.articles.likes', 'followings.articles.comments', 'followings.media', 'followings.media.user', 'followings.media.likes', 'followings.media.comments', 'bookmarks_media', 'bookmarks_article', 'articles', 'media'],
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
