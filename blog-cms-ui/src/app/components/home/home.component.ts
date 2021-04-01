import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-nav></app-nav>
    <ngb-carousel style="max-width: 1024px;">
      <ng-template ngbSlide>
        <img class="img-fluid" src="../../../assets/images/alaska.png">
        <div class="carousel-caption home-back-opacity rounded">
          <h3>Chippy</h3>
          <p>Is a cool chipmunk</p>
        </div>
      </ng-template>
      <ng-template ngbSlide>
        <img class="img-fluid" src="../../../assets/images/hawaii.png">
        <div class="carousel-caption home-back-opacity rounded">
          <h3>Chippy</h3>
          <p>Is a cool chipmunk</p>
        </div>
      </ng-template>
      <ng-template ngbSlide>
        <img class="img-fluid" src="../../../assets/images/london-2.png">
        <div class="carousel-caption home-back-opacity rounded">
          <h3>Chippy</h3>
          <p>Is a cool chipmunk</p>
        </div>
      </ng-template>
      <ng-template ngbSlide>
        <img class="img-fluid" src="../../../assets/images/paris.png">
        <div class="carousel-caption home-back-opacity rounded">
          <h3>Chippy</h3>
          <p>Is a cool chipmunk</p>
        </div>
      </ng-template>
      <ng-template ngbSlide>
        <img class="img-fluid" src="../../../assets/images/oregon.png">
        <div class="carousel-caption home-back-opacity rounded">
          <h3>Chippy</h3>
          <p>Is a cool chipmunk</p>
        </div>
      </ng-template>
      <ng-template ngbSlide>
        <img class="img-fluid" src="../../../assets/images/canyon.png">
        <div class="carousel-caption home-back-opacity rounded">
          <h3>Chippy</h3>
          <p>Is a cool chipmunk</p>
        </div>
      </ng-template>
      <ng-template ngbSlide>
        <img class="img-fluid" src="../../../assets/images/chippy.png">
        <div class="carousel-caption home-back-opacity rounded">
          <h3>Chippy</h3>
          <p>Is a cool chipmunk</p>
        </div>
      </ng-template>
      <ng-template ngbSlide>
        <img class="img-fluid" src="../../../assets/images/london.png">
        <div class="carousel-caption home-back-opacity rounded">
          <h3>Chippy</h3>
          <p>Is a cool chipmunk</p>
        </div>
      </ng-template>
    </ngb-carousel>
  `
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
