export interface Issue {
  id: number;
  comments: number;
  number: number;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  body: string;
  created_at: string;
}
