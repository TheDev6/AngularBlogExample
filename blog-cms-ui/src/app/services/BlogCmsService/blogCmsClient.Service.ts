import {Injectable} from '@angular/core'
import {Http, RequestOptions, Response} from '@angular/http';
import {BlogType} from './blogType';
import {BlogMin} from './BlogMin';
import {Observable, ObservableInput} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ApiResponse} from './ApiResponse';
import {BlogDetailModel} from './BlogDetailModel';
import {BlogCommentCreateModel} from './BlogCommentCreateModel';
import {environment} from '../../../environments/environment';


@Injectable()
export class BlogCmsClient {

  constructor(private http: Http) {
  }

  public getBlogsByType(blogType: BlogType): Observable<ApiResponse<BlogMin[]>> {
    const options = new RequestOptions({params: {'blogType': BlogType[blogType]}});
    const url = environment.blogCmsBaseUrlv1 + '/Blog/GetList';
    return this.http.get(url, options)
      .map(res => {
        const result = res.json() as ApiResponse<BlogMin[]>;
        return result;
      });
  }

  public getBlogDetail(titleSlug: string): Observable<ApiResponse<BlogDetailModel>> {
    const options = new RequestOptions({params: {titleSlug: titleSlug}});
    const url = environment.blogCmsBaseUrlv1 + '/Blog/BlogDetail';

    return this.http.get(url, options)
      .map(res => res.json() as ApiResponse<BlogDetailModel>)
      .catch(err => Observable.throw(err.json() as ApiResponse<object>));
  }

  public postBlogComment(comment: BlogCommentCreateModel, onError: (er: ApiResponse<object>) => void = null): Observable<ApiResponse<string>> {
    const options = new RequestOptions();
    options.body = comment;
    const url = environment.blogCmsBaseUrlv1 + '/Comment/BlogComment';

    return this.http.post(url, comment)
      .map(res => res.json() as ApiResponse<string>)
      .catch(err => Observable.throw(err.json() as ApiResponse<object>));
  }
}
