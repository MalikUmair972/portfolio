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
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-scroll-transition',
  standalone: false,
  templateUrl: './scroll-transition.html',
  styleUrl: './scroll-transition.scss',
})
export class ScrollTransition implements AfterViewInit, OnDestroy {

  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('imgRef')     imgRef!:     ElementRef<HTMLImageElement>;
  @ViewChild('titleRef')   titleRef!:   ElementRef<HTMLElement>;

  private lenis!: Lenis;
  private lenisRaf!: (time: number) => void;
  private triggers: ScrollTrigger[] = [];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initLenis();
      this.initAnimations();
    });
  }

  private initLenis(): void {
    this.lenis = new Lenis({
      duration: 2.5,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -8 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.5,
      syncTouch: false,
    });
    this.lenis.on('scroll', ScrollTrigger.update);
    this.lenisRaf = (time: number) => this.lenis.raf(time * 1000);
    gsap.ticker.add(this.lenisRaf);
    gsap.ticker.lagSmoothing(0);
  }

  private initAnimations(): void {
    const section = this.sectionRef.nativeElement;
    const img     = this.imgRef.nativeElement;
    const textEl  = this.titleRef.nativeElement;

    // Start: pure black + slightly zoomed in
    gsap.set(img,    { filter: 'brightness(0)', scale: 1.08, force3D: true });
    gsap.set(textEl, { opacity: 0, y: 30, force3D: true });

    // Fires once when section enters viewport — plays a timed animation
    // (section is 100vh so scrub has no range; once:true is the right pattern)
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();

        // Image: black → full color + scale settles (slow, cinematic)
        tl.to(img, {
          filter: 'brightness(1)',
          scale: 1,
          duration: 2.2,
          ease: 'power2.out',
          force3D: true,
        }, 0);

        // Text: fades + rises after image starts revealing
        tl.to(textEl, {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
          force3D: true,
        }, 0.7);
      },
    });

    this.triggers.push(st);
  }

  ngOnDestroy(): void {
    if (this.lenisRaf) gsap.ticker.remove(this.lenisRaf);
    this.lenis?.destroy();
    this.triggers.forEach(t => t?.kill());
  }
}
