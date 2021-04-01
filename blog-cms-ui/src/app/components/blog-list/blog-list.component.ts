import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BlogType} from '../../services/BlogCmsService/blogType';
import {BlogCmsClient} from '../../services/BlogCmsService/blogCmsClient.Service';
import {BlogMin} from '../../services/BlogCmsService/BlogMin';
import {List} from 'linqts';

@Component({
  selector: 'app-blog-list',
  providers: [BlogCmsClient],
  template: `
    <app-nav></app-nav>
    <div *ngIf="errorMessage" class="alert alert-danger">{{errorMessage}}</div>
    <span
      *ngIf="currentFilterTerm !== null"
      class="blog-key-word"
      (click)="resetFilter()"
      ngbPopover="clear filter"
      triggers="mouseenter:mouseleave"
    >
  <i class="fa fa-close"></i>
  {{currentFilterTerm}} ({{filteredBlogs.length || 0}} results)
</span>
    <div class="blog-index-item" *ngFor="let b of filteredBlogs">
      <div class="left-15">
        <a routerLink="/{{blogTypeString}}/{{b.TitleSlug}}">
          <img class="img-thumbnail img-fluid" src="{{b.ImageUrl}}"/>
        </a>
      </div>
      <div class="right-85">
        <a class="bold" routerLink="/{{blogTypeString}}/{{b.TitleSlug}}">{{b.Title}}
        </a>
        <br/>
        <span class="bold">Keywords: </span>
        <span class="blog-key-word" *ngFor="let kw of b.Keywords.split(','),let isLast = last"
              (click)="keyWordClick($event)"
              ngbPopover="filter by: {{kw}}"
              triggers="mouseenter:mouseleave"
        >{{kw}}{{!isLast ? ', ' : ''}}</span>
        <br/>
        <span class="bold">Published: </span>{{b.PublishDate | date:'shortDate'}}
        <br/>
        <span class="bold">Description: </span>{{b.Description}}
        <br/>
        <span class="bold">Comments: </span>{{b.CommentCount || 0}}
      </div>
    </div>
  `
})
export class BlogListComponent implements OnInit {

  public blogType: BlogType;
  public blogTypeString: string;
  public blogs: BlogMin[];
  public filteredBlogs: BlogMin[];
  public errorMessage: string;
  public currentFilterTerm: string;

  constructor(private activatedRoute: ActivatedRoute,
              private blogcmsClient: BlogCmsClient) {
    this.currentFilterTerm = null;

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(routeData => {
      this.blogType = <BlogType>routeData.BlogType;
      this.blogTypeString = BlogType[this.blogType] + 'Blog';
    }, err => {
      throw err;
    });

    this.blogcmsClient.getBlogsByType(this.blogType)
      .subscribe(r => {
        this.blogs = new List<BlogMin>(r.Payload).OrderByDescending(b => b.PublishDate).ToArray();
        this.filteredBlogs = this.blogs;
        if (r.Exception) {
          this.errorMessage = r.Exception.Message;
        }
      });
  }

  public keyWordClick(evt: MouseEvent): void {
    var kw = evt.srcElement.innerHTML;
    if (kw) {
      this.currentFilterTerm = this.cleanComma(kw);

      this.filteredBlogs = new List<BlogMin>(this.blogs)
        .Where(b => b.Keywords.toLowerCase().trim().indexOf(this.currentFilterTerm.toLowerCase().trim()) !== -1)
        .OrderByDescending(b => b.PublishDate)
        .ToArray();

    }
  }

  private cleanComma(str: string): string {
    if (str.toLowerCase().trim().indexOf(',') !== -1) {
      str = str.replace(',', '');
    }
    return str;
  }

  public resetFilter() {
    this.currentFilterTerm = null;
    this.filteredBlogs = this.blogs;
  }

}
