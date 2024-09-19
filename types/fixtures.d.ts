import { ArticleResponse } from "./article";

export type DeleteArticlesApi = (accessToken: string) => Promise<void>;

export type CreateArticleApi = (
  accessToken: string,
  articleData: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }
) => Promise<ArticleResponse>;