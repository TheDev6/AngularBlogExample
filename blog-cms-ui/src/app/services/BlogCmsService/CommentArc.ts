export class CommentArc {
  BlogComment: string;
  BlogGuid: string;
  CommentGuid: string;
  Created: Date;
  Name: string;
  ParentCommentGuid: string;
  Comments: CommentArc[];
}
