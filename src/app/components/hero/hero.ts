import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  NgZone,
} from '@angular/core';
import { Application } from '@splinetool/runtime';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit, OnDestroy {

  private splineApp!: Application;
  private rafId!: number;
  private canvas!: HTMLCanvasElement;

  constructor(
    private host: ElementRef<HTMLElement>,
    private ngZone: NgZone,
  ) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const container = this.host.nativeElement.querySelector<HTMLElement>('.hero-container');
      if (!container) return;

      this.canvas = document.createElement('canvas');
      this.canvas.className = 'spline-canvas';
      this.canvas.width  = window.innerWidth;
      this.canvas.height = window.innerHeight;

      // ── html2canvas guard ────────────────────────────────────────────────
      // Tells html2canvas (used by app-three-background) to skip this canvas
      // so it never tries to clone a WebGL surface.
      this.canvas.setAttribute('data-html2canvas-ignore', 'true');

      // ── WebGL context guard ──────────────────────────────────────────────
      // @splinetool/runtime calls canvas.getContext('2d') during initialisation
      // (for text/image pre-processing). If that call succeeds first, the canvas
      // is locked as a 2D canvas and Three.js can no longer create a WebGL
      // context on it.  We intercept '2d' requests and redirect them to a
      // throw-away canvas so the main canvas stays available for WebGL.
      const throwaway = document.createElement('canvas');
      throwaway.width  = this.canvas.width;
      throwaway.height = this.canvas.height;
      const proto = HTMLCanvasElement.prototype.getContext;
      (this.canvas as any).getContext = function (
        type: string,
        ...args: unknown[]
      ) {
        if (type === '2d') return throwaway.getContext('2d');
        return proto.call(this, type, ...args);
      };

      container.appendChild(this.canvas);

      // One rAF so the browser commits layout before Spline touches the canvas
      this.rafId = requestAnimationFrame(() => this.initSpline());
    });
  }

  private async initSpline(): Promise<void> {
    if (!this.canvas) return;
    try {
      this.splineApp = new Application(this.canvas);
      await this.splineApp.load('assets/models/project_promo_look_at_mouse.spline');
    } catch (err) {
      console.error('Spline load error:', err);
    }
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    this.splineApp?.dispose();
    this.canvas?.remove();
  }
}
