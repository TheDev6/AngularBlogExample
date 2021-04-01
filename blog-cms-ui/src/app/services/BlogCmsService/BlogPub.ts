export interface BlogPub {
  BlogGuid: string;
  BlogTypeGuid: string;
  Title: string;
  TitleSlug: string;
  Description: string;
  Keywords: string;
  Content: string;
  PublishDate: Date;
  ImageUrl: string;
  CommentCount?: number;
}
