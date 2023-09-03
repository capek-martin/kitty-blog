export interface Article {
  articleId: string;
  createdAt: Date;
  imageId: string | null;
  lastUpdatedAt: Date;
  perex: string;
  title: string;
}

export interface ArticleInputs {
  imageId: string;
  perex: string;
  title: string;
  content: string;
}
// *** Requests ***
export interface ArticleCreateReq {
  imageId: string;
  perex: string;
  title: string;
  content: string;
}
export interface ArticleUpdateReq {
  articleId: string;
  imageId: string | null;
  perex: string;
  title: string;
  content: string;
}
