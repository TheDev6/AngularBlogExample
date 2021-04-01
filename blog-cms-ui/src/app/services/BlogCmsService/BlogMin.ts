export interface BlogMin {
  BlogGuid: string;
  BlogTypeGuid: string;
  Title: string;
  TitleSlug: string;
  Description: string;
  Keywords: string;
  PublishDate: Date;
  ImageUrl: string;
  CommentCount?: number;
}
