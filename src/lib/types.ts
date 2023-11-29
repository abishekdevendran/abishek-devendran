export type Post = {
  title: string;
  publishedAt: string;
  updatedAt: string;
  summary: string;
  published: boolean;
  tags: string[];
  description?: string;
  author: string;
}