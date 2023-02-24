import { Comments } from '@/types/index';
import users from '@/mocks/user';

const comment1: Comments = {
  id: 1234567890,
  author: users.user1,
  likes: [],
  content: 'Je suis un commentaire',
  createdAt: new Date(),
};

const comment2: Comments = {
  id: 1234567891,
  author: users.user2,
  likes: [
    {
      id: 987654321,
      author: users.user1,
    },
    {
      id: 987654322,
      author: users.user2,
    },
  ],
  content: 'Je suis pas d\'accord avec tout ça laaa',
  createdAt: new Date(),
};

const comment3: Comments = {
  id: 1234,
  author: users.user2,
  likes: [
    {
      id: 98,
      author: users.user1,
    },
  ],
  content: 'Wesh les frites !!',
  createdAt: new Date(),
};

export default {
  comment1,
  comment2,
  comment3,
};
