import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { PROJECTS, ProjectDetail } from '../../data/projects.data';

gsap.registerPlugin(ScrollTrigger);

export interface DissolveCell {
  pos: string;
  size: string;
}

@Component({
  selector: 'app-portfolio-detail',
  standalone: false,
  templateUrl: './portfolio-detail.html',
  styleUrl: './portfolio-detail.scss',
})
export class PortfolioDetail implements OnInit, AfterViewInit, OnDestroy {
  project!: ProjectDetail;
  nextProject!: ProjectDetail;

  readonly dissolveRows = 6;
  readonly dissolveCols = 8;

  s1Grid: DissolveCell[] = [];
  s2Grid: DissolveCell[] = [];
  s1BgStyle!: SafeStyle;
  s2BgStyle!: SafeStyle;

  private lenis!: Lenis;
  private lenisRafFn!: (time: number) => void;
  private ctx!: gsap.Context;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private host: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    // Stop the browser from restoring a stale scroll position for this page.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const id   = Number(this.route.snapshot.paramMap.get('id'));
    const idx  = PROJECTS.findIndex(p => p.id === id);
    const safe = idx >= 0 ? idx : 0;

    this.project     = PROJECTS[safe];
    this.nextProject = PROJECTS[(safe + 1) % PROJECTS.length];

    this.s1BgStyle = this.sanitizer.bypassSecurityTrustStyle(
      `url('${this.project.section1Image}')`,
    );
    this.s2BgStyle = this.sanitizer.bypassSecurityTrustStyle(
      `url('${this.project.section2Image}')`,
    );

    this.s1Grid = this.buildGrid(this.dissolveRows, this.dissolveCols);
    this.s2Grid = this.buildGrid(this.dissolveRows, this.dissolveCols);

    this.cdr.detectChanges();
  }

  private buildGrid(rows: number, cols: number): DissolveCell[] {
    const size  = `${cols * 100}% ${rows * 100}%`;
    const cells: DissolveCell[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = cols > 1 ? (c / (cols - 1)) * 100 : 50;
        const y = rows > 1 ? (r / (rows - 1)) * 100 : 50;
        cells.push({ pos: `${x.toFixed(2)}% ${y.toFixed(2)}%`, size });
      }
    }
    return cells;
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      // Hard-reset native scroll BEFORE Lenis reads window.scrollY at construction.
      // Lenis stores the current scrollY as its initial animatedScroll — if it is
      // non-zero the first RAF tick will jump the page to that saved position.
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // ── Lenis smooth scroll ─────────────────────────────────────────────
      this.lenis = new Lenis({ lerp: 0.08 });
      this.lenis.scrollTo(0, { immediate: true });

      this.lenisRafFn = (time: number) => this.lenis.raf(time * 1000);
      gsap.ticker.add(this.lenisRafFn);
      gsap.ticker.lagSmoothing(0);

      this.lenis.on('scroll', ScrollTrigger.update);

      // After first Lenis RAF tick, init GSAP so ScrollTrigger measures
      // element positions against a confirmed-zero scroll baseline.
      requestAnimationFrame(() => {
        this.lenis.scrollTo(0, { immediate: true });
        setTimeout(() => this.initAnimations(), 60);
      });
    });
  }

  private initAnimations(): void {
    const el = this.host.nativeElement;

    this.ctx = gsap.context(() => {

      // ── Hero parallax ────────────────────────────────────────────────────
      const heroBg = el.querySelector<HTMLElement>('.hero-bg-img');
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: 28,
          ease: 'none',
          scrollTrigger: {
            trigger: '.detail-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Hero content entrance
      const heroItems = el.querySelectorAll('.detail-hero-content > *');
      gsap.fromTo(
        heroItems,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.13, ease: 'power3.out', delay: 0.2 },
      );

      // ── Split section 1 — text ───────────────────────────────────────────
      gsap.fromTo(
        '.s1-text > *',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.split-section-1', start: 'top 70%', once: true },
        },
      );

      // ── Dissolve grid 1 ──────────────────────────────────────────────────
      const cells1 = el.querySelectorAll('.dg-1 .d-cell');
      if (cells1.length) {
        gsap.fromTo(
          cells1,
          { opacity: 0, scale: 0.55, filter: 'blur(8px)' },
          {
            opacity: 1, scale: 1, filter: 'blur(0px)',
            duration: 0.55, ease: 'power2.out',
            stagger: {
              amount: 1.4,
              from: 'random',
              grid: [this.dissolveRows, this.dissolveCols],
            },
            scrollTrigger: { trigger: '.split-section-1', start: 'top 62%', once: true },
          },
        );
      }

      // ── Parallax band ────────────────────────────────────────────────────
      const bandImg = el.querySelector<HTMLElement>('.band-img');
      if (bandImg) {
        gsap.to(bandImg, {
          yPercent: 22,
          ease: 'none',
          scrollTrigger: {
            trigger: '.parallax-band',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      gsap.fromTo(
        '.band-quote',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.parallax-band', start: 'top 58%', once: true },
        },
      );

      // ── Split section 2 — text ───────────────────────────────────────────
      gsap.fromTo(
        '.s2-text > *',
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.split-section-2', start: 'top 70%', once: true },
        },
      );

      // ── Dissolve grid 2 ──────────────────────────────────────────────────
      const cells2 = el.querySelectorAll('.dg-2 .d-cell');
      if (cells2.length) {
        gsap.fromTo(
          cells2,
          { opacity: 0, scale: 0.55, filter: 'blur(8px)' },
          {
            opacity: 1, scale: 1, filter: 'blur(0px)',
            duration: 0.55, ease: 'power2.out',
            stagger: {
              amount: 1.4,
              from: 'random',
              grid: [this.dissolveRows, this.dissolveCols],
            },
            scrollTrigger: { trigger: '.split-section-2', start: 'top 62%', once: true },
          },
        );
      }

      // ── Next project entrance ─────────────────────────────────────────────
      const nextItems = el.querySelectorAll('.next-project-section > *');
      gsap.fromTo(
        nextItems,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.next-project-section', start: 'top 80%', once: true },
        },
      );

    }, el);
  }

  navigateToProject(id: number): void {
    this.ngZone.run(() => this.router.navigate(['/portfolio', id]));
  }

  goBack(): void {
    this.ngZone.run(() => this.router.navigate(['/'], { fragment: 'work' }));
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    if (this.lenisRafFn) gsap.ticker.remove(this.lenisRafFn);
    this.lenis?.destroy();
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}
