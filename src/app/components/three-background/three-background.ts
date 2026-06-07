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

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-three-background',
  standalone: false,
  templateUrl: './three-background.html',
  styleUrl:    './three-background.scss',
})
export class ThreeBackground implements AfterViewInit, OnDestroy {

  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('wrapperRef') wrapperRef!: ElementRef<HTMLElement>;
  @ViewChild('textRef')    textRef!:    ElementRef<HTMLElement>;

  private triggers: ScrollTrigger[] = [];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const isMobile = window.matchMedia('(max-width: 860px)').matches;
      const section  = this.sectionRef.nativeElement;
      const wrapper  = this.wrapperRef.nativeElement;

      if (isMobile) {
        // ── Mobile: no pin, no scrub — simple once reveal ────────────────
        this.animateTextOnce();
      } else {
        // ── Desktop: pin + scrub ─────────────────────────────────────────
        this.triggers.push(ScrollTrigger.create({
          trigger:       section,
          start:         'top top',
          end:           'bottom bottom',
          pin:           wrapper,
          pinSpacing:    false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }));
        this.animateTextScrub(section);
      }
    });
  }

  // ── Desktop: scrub-driven text reveal ──────────────────────────────────────
  private animateTextScrub(section: HTMLElement): void {
    const textEl  = this.textRef.nativeElement;
    const lines   = textEl.querySelectorAll<HTMLElement>('.text-line');
    const eyebrow = textEl.querySelector<HTMLElement>('.text-eyebrow');
    const divider = textEl.querySelector<HTMLElement>('.text-divider');
    const sub     = textEl.querySelector<HTMLElement>('.text-sub');
    const cta     = textEl.querySelector<HTMLElement>('.text-cta');

    gsap.set(textEl,  { opacity: 0 });
    gsap.set(eyebrow, { opacity: 0, y: 24 });
    gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(lines,   { opacity: 0, y: 50, skewY: 5 });
    gsap.set(sub,     { opacity: 0, y: 20 });
    gsap.set(cta,     { opacity: 0, y: 16 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start:   'top top',
        end:     '45% bottom',
        scrub:   1.5,
        invalidateOnRefresh: true,
      },
    });

    tl.to(textEl,  { opacity: 1, duration: 0.4 },                             0)
      .to(eyebrow, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },   0.1)
      .to(divider, { scaleX: 1, duration: 1.4, ease: 'expo.out' },            0.3)
      .to(lines,   { opacity: 1, y: 0, skewY: 0,
                     stagger: 0.12, duration: 1.4, ease: 'power4.out' },       0.5)
      .to(sub,     { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },   1.4)
      .to(cta,     { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },   1.7);

    if (tl.scrollTrigger) {
      this.triggers.push(tl.scrollTrigger as unknown as ScrollTrigger);
    }
  }

  // ── Mobile: simple once scroll reveal — no scrub, no pin ───────────────────
  private animateTextOnce(): void {
    const textEl  = this.textRef.nativeElement;
    const lines   = textEl.querySelectorAll<HTMLElement>('.text-line');
    const eyebrow = textEl.querySelector<HTMLElement>('.text-eyebrow');
    const divider = textEl.querySelector<HTMLElement>('.text-divider');
    const sub     = textEl.querySelector<HTMLElement>('.text-sub');
    const cta     = textEl.querySelector<HTMLElement>('.text-cta');

    // Reveal whole block when it enters viewport
    gsap.set([eyebrow, divider, lines, sub, cta], { opacity: 0, y: 30 });

    const st = ScrollTrigger.create({
      trigger: textEl,
      start:   'top 85%',
      once:    true,
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
          .to(divider,  { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
          .to(lines,    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
          .to(sub,      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
          .to(cta,      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
      },
    });
    this.triggers.push(st);
  }

  ngOnDestroy(): void {
    this.triggers.forEach(t => t?.kill());
  }
}
