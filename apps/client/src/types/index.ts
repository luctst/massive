export interface Media {
  length: number;
  title: string;
  preview: string;
  created_at: Date;
  author?: string;
  description?: string;
  likes?: Array<object>;
  comments?: Array<object>;
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
