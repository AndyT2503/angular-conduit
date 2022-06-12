export type User = {
  username: string;
  email: string;
  password: string;
  id: number;
  bio?: string;
  favoritedArticles?: Array<number>;
}
