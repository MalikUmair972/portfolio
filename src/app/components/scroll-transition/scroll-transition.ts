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
  @ViewChild('wrapperRef') wrapperRef!: ElementRef<HTMLElement>;
  @ViewChild('imgRef')     imgRef!:     ElementRef<HTMLImageElement>;
  @ViewChild('titleRef')   titleRef!:   ElementRef<HTMLElement>;
  @ViewChild('markRef')    markRef!:    ElementRef<HTMLElement>;
  @ViewChild('dotRef')     dotRef!:     ElementRef<HTMLElement>;

  private lenis!: Lenis;
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
      syncTouch: true,
    });
    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => this.lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  private initAnimations(): void {
    const section = this.sectionRef.nativeElement;
    const wrapper = this.wrapperRef.nativeElement;
    const img     = this.imgRef.nativeElement;
    const textEl  = this.titleRef.nativeElement;
    const dot     = this.dotRef.nativeElement;
    const mark    = this.markRef.nativeElement;

    // ── Initial states (no flicker) ───────────────────────────────────
    gsap.set(img, {
      filter: 'brightness(0.05) contrast(1.2)',
      scale: 0.85,
      force3D: true,
    });
    gsap.set(textEl, { opacity: 0, y: 60, force3D: true });
    gsap.set(dot, {
      width: '142vmax',
      height: '142vmax',
      xPercent: -50,
      yPercent: -50,
      top: '50%',
      left: '50%',
      scale: 0,
      force3D: true,
    });

    // ── Pin wrapper while section scrolls ────────────────────────────
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: wrapper,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    const scrub = 2.5;

    // Phase 1 — 0%→30%: Dark → Light
    gsap.fromTo(img,
      { filter: 'brightness(0.05) contrast(1.2)' },
      {
        filter: 'brightness(1) contrast(1)',
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '30% bottom',
          scrub,
          invalidateOnRefresh: true,
        },
      }
    );

    // Phase 2 — 0%→50%: Scale up
    gsap.fromTo(img,
      { scale: 0.85 },
      {
        scale: 1.08,
        ease: 'none',
        immediateRender: false,
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '50% bottom',
          scrub: scrub + 0.5,
          invalidateOnRefresh: true,
        },
      }
    );

    // Phase 3 — 20%→45%: Text fades in
    gsap.fromTo(textEl,
      { opacity: 0, y: 60, force3D: true },
      {
        opacity: 1,
        y: 0,
        ease: 'none',
        immediateRender: false,
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: '20% top',
          end: '45% bottom',
          scrub,
          invalidateOnRefresh: true,
        },
      }
    );

    // Phase 4 — 55%→80%: Light → Dark again
    gsap.fromTo(img,
      { filter: 'brightness(1) contrast(1)' },
      {
        filter: 'brightness(0.05) contrast(1.2)',
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: '55% top',
          end: '80% bottom',
          scrub,
          invalidateOnRefresh: true,
        },
      }
    );

    // Phase 5 — 82%→100%: Dot expands from "?" → full screen
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: '82% top',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
      defaults: { ease: 'none' },
    }).fromTo(dot,
      {
        scale: 0,
        force3D: true,
        x: () => {
          const mb = mark.getBoundingClientRect();
          return mb.left + mb.width * 0.50 - section.getBoundingClientRect().width / 2;
        },
        y: () => {
          const mb = mark.getBoundingClientRect();
          return mb.top + mb.height * 0.80 - section.getBoundingClientRect().height / 2;
        },
      },
      {
        scale: 1,
        x: 0,
        y: 0,
        ease: 'power3.in',
        force3D: true,
      }
    );
  }

  ngOnDestroy(): void {
    this.lenis?.destroy();
    gsap.ticker.remove(() => {});
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}