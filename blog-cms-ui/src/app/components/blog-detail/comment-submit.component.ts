import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {BlogCommentCreateModel} from "../../services/BlogCmsService/BlogCommentCreateModel";
import {BlogCmsClient} from "../../services/BlogCmsService/blogCmsClient.Service";
import {ValidationFailure} from "../../services/BlogCmsService/ValidationFailure";
import {ApiResponse} from "../../services/BlogCmsService/ApiResponse";
import {List} from "linqts";

@Component({
  selector: 'app-comment-submit',
  template: `
    <div style="max-width:600px;">
      <div>
        <div class="form-group">
          <label class="bold">Name:</label>
          <input type="text" class="form-control" [(ngModel)]="comment.Name"/>
        </div>
        <div class="form-group">
          <label class="bold">Email (won't be displayed):</label>
          <input type="text" class="form-control" [(ngModel)]="comment.Email"/>
        </div>
        <div class="form-group">
          <label class="bold">Comment:</label>
          <textarea class="form-control" rows="6" [(ngModel)]="comment.BlogComment"></textarea>
        </div>
        <button [disabled]="inTransit" (click)="submit()">
          <i *ngIf="inTransit" class="fa fa-cog fa-spin"></i>Submit
        </button>
        <div *ngIf="messages.length > 0" class="alert alert-danger">
          <ul>
            <li *ngFor="let m of messages">{{m}}</li>
          </ul>
        </div>
        <br/>
        <br/>
      </div>
    </div>
  `,
  providers: [BlogCmsClient]
})
export class CommentSubmitComponent implements OnInit {
  @Input() blogGuid: string = null;
  @Input() parentCommentGuid: string = null;
  @Output() onSuccess = new EventEmitter<null>();

  comment: BlogCommentCreateModel = new BlogCommentCreateModel();
  messages: string[] = [];
  inTransit: boolean = false;

  constructor(private blogCmsClient: BlogCmsClient) {
  }

  ngOnInit() {
    this.comment.BlogGuid = this.blogGuid;
    this.comment.ParentCommentGuid = this.parentCommentGuid;
  }

  onError(response: ApiResponse<any>) {
    this.messages = response.ValidationResult.messages;
  }

  submit() {
    this.messages = [];

    const localValidation = this.preValidate(this.comment);
    if (localValidation.length === 0) {
      this.inTransit = true;
      this.blogCmsClient.postBlogComment(this.comment, this.onError)
        .subscribe(
          response => {
            this.inTransit = false;
            this.clearFields();
            this.onSuccess.emit();
          }, error => {
            this.messages = new List<ValidationFailure>((error as ApiResponse<object>)
              .ValidationResult.ValidationFailures)
              .Select(v => v.Message).ToArray();
            this.inTransit = false;
          }, () => {// complete , code doesn't seem to ever be reached
            this.inTransit = false;
          });
    } else {
      this.messages = localValidation;
    }

  }

  preValidate(comment: BlogCommentCreateModel): string[] {
    const result: string[] = [];
    if (!comment.Name) {
      result.push('Name is required');
    }
    if (!comment.Email) {
      result.push('Email is required');
    }
    if (!comment.BlogComment) {
      result.push('Comment is required');
    }
    return result;
  }

  clearFields() {
    this.comment.Name = null;
    this.comment.Email = null;
    this.comment.BlogComment = null;
  }
}
