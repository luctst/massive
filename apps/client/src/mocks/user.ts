import { UserStore } from '@/types/index';
import PP from '@/assets/profil-pic1.svg';
import BG from '@/assets/Rectangle24.svg';

const user1: UserStore = {
  id: 27513,
  isConnected: true,
  firstname: 'John',
  lastname: 'Doe',
  avatar: PP,
  followers: [],
  createdAt: new Date(),
  social: {
    web: 'https://www.google.com/',
    instagram: 'https://www.instagram.com/',
    youtube: 'https://www.youtube.com/',
  },
  comments: [],
  following: [],
  media: [],
  profilBackground: BG,
  bookmarks: [],
  description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.'
};

const user2: UserStore = {
  id: 66666,
  firstname: 'Franck',
  lastname: 'Duhart',
  avatar: PP,
  followers: [],
  following: [],
  bookmarks: [],
  createdAt: new Date(),
  comments: [],
  social: {},
  media: [],
  profilBackground: BG,
};

export default {
  user1,
  user2,
};
