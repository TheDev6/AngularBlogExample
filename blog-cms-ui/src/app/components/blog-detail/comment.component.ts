import {Component, EventEmitter, Input, OnInit, Output}from '@angular/core'
import {CommentArc} from "../../services/BlogCmsService/CommentArc";

@Component({
  selector: 'app-comment',
  template: `
    <div class="blog-index-item">
      <span class="bold">Name: </span>{{comment?.Name}}
      <br/>
      <span class="bold">Comment Date: </span>{{comment?.Created | date:'shortDate'}}
      <br/>
      <span class="bold">Comment: </span>
      <br/>
      {{comment?.BlogComment}}
      <br/>

      <span class="blog-key-word"
            (click)="isReply=!isReply"
      ><i
        class="fa fa-close"
        *ngIf="isReply"
      ></i>Reply
      </span>

      <app-comment-submit
        *ngIf="isReply"
        (onSuccess)="bubbleCommentAdded()"
        [blogGuid]="comment?.BlogGuid"
        [parentCommentGuid]="comment?.CommentGuid"
      ></app-comment-submit>

      <app-comment
        *ngFor="let c of comment.Comments"
        [comment]="c"
      ></app-comment>
    </div>
  `
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentArc;
  @Output() onCommentAdded = new EventEmitter<null>();
  isReply: boolean;


  constructor() {
    this.isReply = false;
  }

  ngOnInit() {

  }

  public bubbleCommentAdded() {
    this.isReply = false;
    this.onCommentAdded.emit();
  }
}
