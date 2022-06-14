import { Comment } from "./comment.model";

export type Article = {
  userId: number;
  creationTime: Date;
  content: string;
  description: string;
  tags: Array<string>;
  title: string;
  slug: string;
  comments?: Array<Comment>;
  id: number;
}
