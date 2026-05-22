import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import html2canvas from 'html2canvas';
import imagesLoaded from 'imagesloaded';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-three-background',
  standalone: false,
  templateUrl: './three-background.html',
  styleUrl: './three-background.scss',
})
export class ThreeBackground implements AfterViewInit, OnDestroy {

  // The element to capture
  @ViewChild('captureRef')  captureRef!:  ElementRef<HTMLElement>;
  // Container where canvases will be appended (NOT body)
  @ViewChild('canvasWrap')  canvasWrap!:  ElementRef<HTMLElement>;
  @ViewChild('sectionRef')  sectionRef!:  ElementRef<HTMLElement>;
  @ViewChild('wrapperRef')  wrapperRef!:  ElementRef<HTMLElement>;

  private readonly COUNT        = 75;
  private readonly REPEAT_COUNT = 3;
  private createdCanvases: HTMLCanvasElement[] = [];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const captureEl = this.captureRef.nativeElement;
      const imgs      = Array.from(captureEl.querySelectorAll('img'));

      // Pin wrapper for sticky scroll
      ScrollTrigger.create({
        trigger: this.sectionRef.nativeElement,
        start: 'top top',
        end: 'bottom bottom',
        pin: this.wrapperRef.nativeElement,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // Wait for image load then capture
      imagesLoaded(imgs).on('always', () => {
        this.createDisintegration(captureEl);
      });
    });
  }

  private createDisintegration(captureEl: HTMLElement): void {
    const canvasWrap = this.canvasWrap.nativeElement;
    const section    = this.sectionRef.nativeElement;

    html2canvas(captureEl, { useCORS: true, allowTaint: true }).then((canvas) => {
      const width   = canvas.width;
      const height  = canvas.height;
      const ctx     = canvas.getContext('2d')!;
      const imgData = ctx.getImageData(0, 0, width, height);

      // Hide original — canvases take over
      captureEl.style.visibility = 'hidden';

      // Build COUNT empty ImageData layers
      const dataList: ImageData[] = Array.from(
        { length: this.COUNT },
        () => ctx.createImageData(width, height)
      );

      // Distribute pixels across layers (disintegration algorithm)
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          for (let l = 0; l < this.REPEAT_COUNT; l++) {
            const idx       = (x + y * width) * 4;
            const dataIndex = Math.floor(
              (this.COUNT * (Math.random() + (2 * x) / width)) / 3
            );
            for (let p = 0; p < 4; p++) {
              dataList[dataIndex].data[idx + p] = imgData.data[idx + p];
            }
          }
        }
      }

      // One canvas per layer — append to canvasWrap (NOT body)
      dataList.forEach((data, i) => {
        const cloned = canvas.cloneNode() as HTMLCanvasElement;
        cloned.getContext('2d')!.putImageData(data, 0, 0);
        cloned.classList.add('particle-canvas');
        canvasWrap.appendChild(cloned);   // ✅ inside wrapper, not body
        this.createdCanvases.push(cloned);

        const angle   = (Math.random() - 0.5) * 2 * Math.PI;
        const rotDeg  = 30 * (Math.random() - 0.5);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            scrub: 1,
            start: 'top top',
            end: 'bottom bottom',
            invalidateOnRefresh: true,
          },
        });

        tl.to(cloned, {
          duration: 1,
          rotate: rotDeg,
          x: 120 * Math.sin(angle),    // more spread inside container
          y: 120 * Math.cos(angle),
          opacity: 0,
          delay: (i / this.COUNT) * 2,
          ease: 'none',
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.createdCanvases.forEach(c => c.remove());
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}