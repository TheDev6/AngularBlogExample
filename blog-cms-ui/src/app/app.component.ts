import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="margin: 10px;">
      <router-outlet></router-outlet>
      <hr>
      &copy; Chadwick {{year}}
    </div>
  `
})
export class AppComponent implements OnInit {
  public year: string;

  constructor() {
  }

  ngOnInit() {
    this.year = new Date().getFullYear().toString();
  }
}
