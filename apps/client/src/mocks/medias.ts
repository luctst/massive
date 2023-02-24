import { Media, Article } from '@/types/index';
import YT from '@/assets/youtube-screen.svg';
import users from '@/mocks/user';

const media1: Media = {
  id: 67890,
  length: 50000,
  title: 'Bruno le maire face aux jeunes',
  preview: YT,
  likes: [],
  comments: [],
  createdAt: new Date(),
  author: users.user1,
};

const media2: Media = {
  id: 123456,
  author: users.user2,
  length: 700000,
  title: 'Veniam in dolore fugiat eu nisi.',
  preview: YT,
  likes: [],
  comments: [],
  createdAt: new Date(),
  description: 'Lorem sint eu officia cillum. Dolor Lorem ad sit cupidatat magna ut culpa non Lorem voluptate anim incididunt incididunt reprehenderit nisi.',
};

const article1: Article = {
  id: 2345654,
  title: 'Veniam in dolore fugiat eu nisi.',
  content: `<p class="is__article__content">Article content</p><p class="is__article__content">Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.</p><p class="is__article__content">Esse sit labore est et. Magna aute aliqua fugiat ullamco ipsum. Enim consectetur fugiat adipisicing ipsum nisi quis occaecat est ullamco. Amet adipisicing minim ullamco reprehenderit qui aliquip enim aliquip labore magna exercitation voluptate exercitation sunt Lorem.</p>`,
  author: users.user1,
  createdAt: new Date(),
  likes: [],
  comments: [],
};

export default {
  media1,
  media2,
  article1,
};
