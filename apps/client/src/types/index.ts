type PublicationsType = 'article' | 'media';

export interface Media {
  id: number;
  length: number;
  title: string;
  preview: string;
  createdAt: string;
  user: UserStore;
  likes: Array<Likes>;
  comments: Array<Comments>;
  card_type: PublicationsType;
  views: string;
  categories?: Array<string>;
  description?: string;
}

export interface UserStore {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  bookmarks_media: Array<Media>;
  bookmarks_article: Array<Article> ;
  followers: Array<UserStore>;
  followings: Array<UserStore>;
  articles: Array<Article>;
  media: Array<Media>;
  comments: Array<Comments>;
  createdAt: Date;
  udpatedAt: Date;
  pricing: number;
  provider: string;
  jwt?: string;
  social?: {
  [key: string]: string;
  };
  avatar_url?: string;
  profil_background?: string;
  description?: string;
}

export interface Likes {
  id: number;
  user_id: number | string;
  article_id: number;
  media_id: number;
}

export interface Comments {
  id: number;
  author?: UserStore;
  user?: UserStore;
  likes: Array<Likes>;
  content: string;
  createdAt: Date;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  user: UserStore;
  createdAt: string;
  likes: Array<Likes>;
  comments: Array<Comments>;
  card_type: PublicationsType;
}

export interface ReqAxiosNewUser {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
}

export interface StrapiResponse {
  id: number;
  attributes: Record<any, Article | Media | Comments | Likes>;
}
