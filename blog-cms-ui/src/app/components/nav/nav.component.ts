import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {

  public isNavDown: boolean;

  constructor() {
    this.isNavDown = false;
  }

  public navToggle() {
    this.isNavDown = !this.isNavDown;
  }

  public navClick() {
    this.isNavDown = false;
  }
}
