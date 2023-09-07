export interface Comment {
  commentId: string;
  articleId: string;
  author: string;
  content: string;
  postedAt: string;
  score: number;
}

export interface CommentInputs {
  articleId: string;
  author: string;
  content: string;
}
