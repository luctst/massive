export interface CardWidthData {
  media: {
    length: number;
    title: string;
    preview: string;
    likes?: Array<object>;
    comments?: Array<object>;
  };
  user: {
    name: string;
    family_name: string;
    avatar: string;
  };
  created_at: Date;
}
