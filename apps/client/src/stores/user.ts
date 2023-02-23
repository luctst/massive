import { defineStore } from 'pinia';
import { UserStore } from '@/types/index';
import YTpreview from '@/assets/youtube-screen.svg';
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
    createdAt: new Date(),
    following: [
      {
        id: 0,
        isConnected: true,
        firstname: 'John',
        lastname: 'Doe',
        avatar: PP,
        followers: [],
        following: [],
        profilBackground: BG,
        bookmarks: [],
        createdAt: new Date(),
        description: 'Lorem sint eu officia cillum. Dolor Lorem ad sit cupidatat magna ut culpa non Lorem voluptate anim incididunt incididunt reprehenderit nisi.',
        media: [
          {
            id: 23,
            length: 5000,
            title: 'Bruno le maire face aux jeunes',
            preview: YTpreview,
            likes: [],
            comments: [],
            created_at: new Date(),
          },
        ],
      },
    ],
    media: [],
    profilBackground: BG,
    bookmarks: [],
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }),
});
