export interface Article {
  articleId: string;
  createdAt: Date;
  imageId: string | null;
  lastUpdatedAt: Date;
  content: string;
  perex: string;
  title: string;
  comments: Comment;
}

export interface ArticleInputs {
  imageId?: string;
  perex: string;
  title: string;
  content: string;
}
