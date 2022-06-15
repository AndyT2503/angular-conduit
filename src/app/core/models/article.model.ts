
export type Article = {
  userId: number;
  creationTime: Date;
  content: string;
  description: string;
  tags: Array<string>;
  title: string;
  slug: string;
  id: number;
  favorited: number;
}
