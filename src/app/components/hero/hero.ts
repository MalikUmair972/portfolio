import { Component, OnDestroy, OnInit } from '@angular/core';
import { Application } from '@splinetool/runtime';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit, OnDestroy {
  private splineApp!: Application;
  private canvasId = 'hero-canvas';

  ngOnInit(): void {
    this.initSpline();
  }

  ngOnDestroy(): void {
    // this.splineApp?.dispose();
  }

  private initSpline(): void {
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    this.splineApp = new Application(canvas);
    this.splineApp
      .load('assets/models/project_promo_look_at_mouse.spline')
      .then(() => {
        console.log('Spline model loaded!');
      })
      .catch((err) => {
        console.error('Spline load error:', err);
      });
  }
}