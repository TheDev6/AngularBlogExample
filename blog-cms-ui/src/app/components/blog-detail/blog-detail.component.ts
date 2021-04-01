import {Component, OnInit, AfterViewInit, AfterViewChecked, PLATFORM_ID, Inject} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {BlogCmsClient} from '../../services/BlogCmsService/blogCmsClient.Service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {BlogDetailModel} from "../../services/BlogCmsService/BlogDetailModel";
declare var SyntaxHighlighter: any;//window scope from index.html

@Component({
  selector: 'app-blog-detail',
  providers: [BlogCmsClient],
  template: `
    <app-nav></app-nav>
    <h2 class="bold"><img class="img-thumbnail" style="max-width: 150px;" src="{{blog?.Blog.ImageUrl}}">
      {{blog?.Blog.Title}}</h2>
    <div class="blog-index-item">
      <span class="bold">Keywords: </span>{{blog?.Blog.Keywords}}
      <br/>
      <span class="bold">Publish Date: </span>{{blog?.Blog.PublishDate | date:'shortDate'}}
      <br/>
      <span class="bold">Description: </span>{{blog?.Blog.Description}}
      <br/>
      <br/>
      <span [innerHtml]="trustedHtmlContent"></span>
    </div>
    <h4>Comments ({{blog?.CommentCount}}):</h4>
    <app-comment *ngFor="let c of blog?.Comments" [comment]="c" (onCommentAdded)="onCommentAdded()"></app-comment>
    <br/>
    <br/>
    <h4>Leave a Comment:</h4>
    <app-comment-submit
      *ngIf="blog !== null"
      (onSuccess)="onCommentAdded()"
      [blogGuid]="blog?.Blog.BlogGuid"
      [parentCommentGuid]="null"
    ></app-comment-submit>
  `
})
export class BlogDetailComponent implements OnInit, AfterViewInit, AfterViewChecked {

  public blog: BlogDetailModel = null;
  public trustedHtmlContent: SafeHtml = null;
  private titleSlug: string = null;

  constructor(private activatedRoute: ActivatedRoute,
              private blogClient: BlogCmsClient,
              private domSanitizer: DomSanitizer,
              @Inject(PLATFORM_ID) private platformId: Object) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(r => this.titleSlug = r.id);
    this.loadBlogData(this.titleSlug);
  }

  loadBlogData(titleSlug: string): void {
    if (this.titleSlug) {
      this.blogClient.getBlogDetail(titleSlug)
        .subscribe(r => {
          this.blog = r.Payload;
          this.trustedHtmlContent = this.domSanitizer
            .bypassSecurityTrustHtml(this.processSyntaxContent(this.blog.Blog.Content));
        });
    }
  }

  processSyntaxContent(input: string): string {
    const jscript = '<pre class="jscript">';
    if (input.indexOf(jscript) !== -1) {
      input = input.replace(jscript, '<script type="syntaxhighlighter" class="brush: jscript><![CDATA[')
    }

    const cSharp = '<pre class="csharp">';
    if (input.indexOf(cSharp) !== -1) {
      input = input.replace(jscript, '<script type="syntaxhighlighter" class="brush: csharp><![CDATA[');
    }

    const sql = '<pre class="sql">';
    if (input.indexOf(sql) !== -1) {
      input = input.replace(jscript, '<script type="syntaxhighlighter" class="brush: sql><![CDATA[');
    }

    const css = '<pre class="css">';
    if (input.indexOf(css) !== -1) {
      input = input.replace(jscript, '<script type="syntaxhighlighter" class="brush: css><![CDATA[');
    }

    const html = '<pre class="html">';
    if (input.indexOf(html) !== -1) {
      input = input.replace(jscript, '<script type="syntaxhighlighter" class="brush: html><![CDATA[');
    }

    const endPre = '</pre>';
    if (input.indexOf(endPre) !== -1) {
      input = input.replace(endPre, ']]></script>');
    }

    return input;

    //from the old site
    //  $(selector).each(function () {
    //   var $self = $(this);
    // let content = "<script type=\"syntaxhighlighter\" class=\"brush: " + brushName + "\"><![CDATA[" + $self.text() + "]]></script>";
    //   $self.replaceWith(content);
  };

  ngAfterViewInit() {
    // not a good time frame to modify the dom with old js libs
  }

  ngAfterViewChecked() {

    //Server side render
    if (isPlatformBrowser(this.platformId)) {
      // this is the hack for dom ready and to get window scoped syntax highlighting to work.
      let syntax = this.getSyntaxHighlighter();
      let brk = 0;
      const maxAttempts = 10;
      if (syntax) {
        this.highlight();
      } else {
        while (!syntax && brk <= maxAttempts) {
          syntax = this.getSyntaxHighlighter();
          brk++;
          if (brk >= maxAttempts) {
            console.log('Failed to populate SyntaxHighlighter.')
          }
        }
        if (syntax) {
          this.highlight();
        }
      }

      if (isPlatformServer(this.platformId)) {
        // crickets chirping
      }
    }
  }

  highlight() {
    this.getSyntaxHighlighter().highlight();
  }

  getSyntaxHighlighter(): any {
    return window['SyntaxHighlighter'];
  }

  onCommentAdded() {
    console.log('detail load data!');
    this.loadBlogData(this.titleSlug);
  }
}
