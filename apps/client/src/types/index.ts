export interface MediaType {
  isMedia: boolean;
  isArticle: boolean;
}

export interface Media {
  id: number;
  length: number;
  title: string;
  preview: string;
  createdAt: Date;
  author: UserStore;
  likes: Array<Likes>;
  comments: Array<Comments>;
  type: MediaType;
  view: number;
  description?: string;
}

export interface UserStore {
  id: number;
  firstname: string;
  lastname: string;
  bookmarks: Array<Article | Media> | null;
  followers: Array<UserStore> | null;
  following: Array<UserStore> | null;
  media: Array<Media | Article> | null;
  comments: Array<Comments> | null;
  createdAt: Date;
  udpatedAt: Date;
  jwt: string;
  pricing: number;
  social?: {
  [key: string]: string;
  };
  avatar?: string | null;
  profilBackground?: string;
  description?: string;
}

export interface Likes {
  id: number;
  author: UserStore;
}

export interface Comments {
  id: number;
  author: UserStore;
  likes: Array<Likes>;
  content: string;
  createdAt: Date;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  author: UserStore;
  createdAt: Date;
  likes: Array<Likes>;
  comments: Array<Comments>;
  type: MediaType;
}

export interface ReqAxiosNewUser {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
}
