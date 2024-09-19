export interface ArticleResponse {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
    favorited: boolean;
    favoritesCount: number;
    author: {
      username: string;
      bio: string | null;
      image: string;
      following: boolean;
    };
  };
}


export interface ArticleData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
