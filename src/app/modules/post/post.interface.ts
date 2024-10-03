export interface IPost {
  content: string;
  images: string[];
  categories: string;
  premium: boolean;
  user: string;
  upVoteCount: number;
  downVoteCount: number;
  commentCount: number;
}