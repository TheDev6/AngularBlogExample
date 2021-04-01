// 3rd party
import {ServerModule} from '@angular/platform-server';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ApplicationInsightsModule, AppInsightsService} from '@markpieszak/ng-application-insights';


// This application
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {BlogListComponent} from './components/blog-list/blog-list.component';
import {BlogDetailComponent} from './components/blog-detail/blog-detail.component';
import {HomeComponent} from './components/home/home.component';
import {BlogCmsClient} from './services/BlogCmsService/blogCmsClient.Service';
import {CommentComponent} from './components/blog-detail/comment.component';
import {CommentSubmitComponent} from './components/blog-detail/comment-submit.component';
import {environment} from 'environments/environment';

@NgModule({
  declarations: [
  ],
  imports: [
    ServerModule,
    AppModule,
    ApplicationInsightsModule.forRoot({instrumentationKey: environment.appInsightsKey})
  ],
  providers: [BlogCmsClient, AppInsightsService],
  bootstrap: [AppComponent]
})
export class AppServerModule {
}
