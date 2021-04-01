import {NgModule} from '@angular/core';
import {RouterModule, Route, Routes} from '@angular/router';

import {BlogListComponent} from './components/blog-list/blog-list.component';
import {BlogDetailComponent} from "./components/blog-detail/blog-detail.component";
import {HomeComponent} from './components/home/home.component';
import {BlogType} from './services/BlogCmsService/blogType';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'DeveloperBlog', component: BlogListComponent, data: {BlogType: BlogType.Developer}},
  {path: 'DeveloperBlog/:id', component: BlogDetailComponent},
  {path: 'DeveloperBlog/Result/:id', component: BlogDetailComponent},
  {path: 'ElectronicsBlog', component: BlogListComponent, data: {BlogType: BlogType.Electronics}},
  {path: 'ElectronicsBlog/:id', component: BlogDetailComponent},
  {path: 'ElectronicsBlog/Result/:id', component: BlogDetailComponent},
  {path: 'MusicBlog', component: BlogListComponent, data: {BlogType: BlogType.Music}},
  {path: 'MusicBlog/:id', component: BlogDetailComponent},
  {path: 'MusicBlog/Result/:id', component: BlogDetailComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
