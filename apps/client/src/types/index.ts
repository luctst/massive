export interface Media {
  id: number;
  length: number;
  title: string;
  preview: string;
  created_at: Date;
  author?: string;
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
  picture: string;
}

export interface UserStore {
  id: number;
  isConnected: boolean;
  firstname: string;
  lastname: string;
  bookmarks: Array<number> | null;
  avatar: string | null;
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
  likes: Array<Likes>;
  content: string;
}

export interface Article {
  id: number;
  title: string;
  likes: Array<Likes>;
  comments: Array<object>;
  content: string;
}
