export interface Media {
  id: number;
  length: number;
  title: string;
  preview: string;
  createdAt: Date;
  author: UserStore;
  likes: Array<Likes>;
  comments: Array<Comments>;
  description?: string;
}

export interface UserStore {
  id: number;
  firstname: string;
  lastname: string;
  avatar: string | null;
  bookmarks: Array<Article | Media> | null;
  followers: Array<UserStore> | null;
  following: Array<UserStore> | null;
  media: Array<Media | Article> | null;
  createdAt: Date;
  comments: Array<Comments> | null;
  social: {
    [key: string]: string;
  }; 
  profilBackground?: string;
  isConnected?: boolean;
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
}
