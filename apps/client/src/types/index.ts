export interface Media {
  id: number;
  length: number;
  title: string;
  preview: string;
  created_at: Date;
  author?: UserStore;
  description?: string;
  likes?: Array<Likes>;
  comments?: Array<Comments>;
}

export interface CardWidthData {
  media: Media;
  user: {
    name: string;
    family_name: string;
    avatar: string;
  };
}

export interface PropsAvatarWithName {
  firstname: string;
  lastname: string;
  avatar: string;
}

export interface Comments {
  author: {
    id: number;
    firstname: string;
    lastname: string;
  };
  content: string;
  createdAt: Date;
  likes: Array<number>;
}

export type SocialObject = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'web' | 'youtube';

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
  social?: {
    [key in SocialObject]: string;
  }; 
  profilBackground?: string;
  isConnected?: boolean;
  description?: string;
}

export interface Likes {
  id: number;
  user: {
    id: number;
    likedAt: Date;
  };
}

export interface Comments {
  id: number;
  user: {
    id: number
    firstname: string;
    lastname: string
    commentAt: Date;
    avatar?: string;
  };
  likes: Array<number>;
  content: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  author: UserStore;
  createdAt: Date;
  likes?: Array<Likes>;
  comments?: Array<object>;
}
