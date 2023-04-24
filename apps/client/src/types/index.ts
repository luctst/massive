export interface MediaType {
  cardType: {
    isMedia: boolean;
    isArticle: boolean;
  }
}

export interface Media {
  id: number;
  length: number;
  title: string;
  preview: string;
  createdAt: string;
  user: UserStore;
  likes: Array<Likes>;
  comments: Array<Comments>;
  card_type: MediaType;
  views: number;
  categories?: Array<string>;
  description?: string;
}

export interface UserStore {
  id: number;
  firstname: string;
  lastname: string;
  bookmarks_media: Array<Media> | null;
  bookmarks_article: Array<Article> | null;
  followers: Array<UserStore> | null;
  followings: Array<UserStore> | null;
  articles: Array<Article> | null;
  media: Array<Media> | null;
  comments: Array<Comments> | null;
  createdAt: Date;
  udpatedAt: Date;
  pricing: number;
  jwt?: string;
  social?: {
  [key: string]: string;
  };
  avatar?: string | null;
  profil_background?: string;
  description?: string;
}

export interface Likes {
  id: number;
  user_id: number;
  article_id: number;
  media_id: number;
}

export interface Comments {
  id: number;
  user: UserStore;
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
  card_type: MediaType;
}

export interface ReqAxiosNewUser {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
}
