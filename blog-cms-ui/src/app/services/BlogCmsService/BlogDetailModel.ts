import {BlogPub} from "./BlogPub";
import {CommentArc} from "./CommentArc";

export interface BlogDetailModel {
  Blog: BlogPub;
  Comments: CommentArc[];
  CommentCount: number;
}
