import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  NgZone,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { gsap } from 'gsap';

export interface NavLink {
  label: string;
  path?: string;
  fragment?: string;
  type: 'route' | 'scroll';
}

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav implements AfterViewInit, OnDestroy {
  @ViewChild('navRoot')      navRoot!:      ElementRef<HTMLElement>;
  @ViewChild('logoRef')      logoRef!:      ElementRef<HTMLElement>;
  @ViewChild('linksRef')     linksRef!:     ElementRef<HTMLElement>;
  @ViewChild('indicatorRef') indicatorRef!: ElementRef<HTMLElement>;
  @ViewChild('ctaRef')       ctaRef!:       ElementRef<HTMLElement>;

  links: NavLink[] = [
    { label: 'Home',      path: '/',            type: 'route'  },
    { label: 'Work',      fragment: 'work',      type: 'scroll' },
    { label: 'Portfolio', path: '/portfolio',    type: 'route'  },
    { label: 'Services',  fragment: 'services',  type: 'scroll' },
    { label: 'Contact',   path: '/contact',      type: 'route'  },
  ];

  mobileOpen = false;
  scrolled   = false;

  private sub!: Subscription;
  private indicatorVisible = false;
  private qiX!: gsap.QuickToFunc;
  private qiW!: gsap.QuickToFunc;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const was = this.scrolled;
    this.scrolled = window.scrollY > 60;
    if (was !== this.scrolled) this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const root      = this.navRoot.nativeElement;
      const logo      = this.logoRef.nativeElement;
      const cta       = this.ctaRef.nativeElement;
      const indicator = this.indicatorRef.nativeElement;
      const navLinks  = root.querySelectorAll<HTMLElement>('.nav-link');

      // ── Staggered entry ──────────────────────────────────────────────────
      gsap.set(logo,     { y: -24, opacity: 0 });
      gsap.set(navLinks, { y: -18, opacity: 0 });
      gsap.set(cta,      { y: -18, opacity: 0 });

      gsap.to(logo,     { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.3 });
      gsap.to(navLinks, { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out', delay: 0.48 });
      gsap.to(cta,      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.78 });

      // ── Sliding indicator quickTo ────────────────────────────────────────
      gsap.set(indicator, { opacity: 0, width: 80 });
      this.qiX = gsap.quickTo(indicator, 'x',     { duration: 0.4, ease: 'power3.out' });
      this.qiW = gsap.quickTo(indicator, 'width',  { duration: 0.4, ease: 'power3.out' });
    });

    // Close mobile menu on route change
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.mobileOpen) {
          this.mobileOpen = false;
          document.body.style.overflow = '';
          this.cdr.detectChanges();
        }
      });
  }

  // ── Logo 3D tilt ──────────────────────────────────────────────────────────
  onLogoMove(e: MouseEvent): void {
    this.ngZone.runOutsideAngular(() => {
      const logo = this.logoRef.nativeElement;
      const r    = logo.getBoundingClientRect();
      const rx   = ((e.clientY - r.top)  / r.height - 0.5) * -28;
      const ry   = ((e.clientX - r.left) / r.width  - 0.5) *  28;
      gsap.to(logo, {
        rotateX: rx, rotateY: ry,
        transformPerspective: 500,
        duration: 0.35, ease: 'power2.out', overwrite: 'auto',
      });
    });
  }

  onLogoLeave(): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.to(this.logoRef.nativeElement, {
        rotateX: 0, rotateY: 0,
        duration: 0.9, ease: 'elastic.out(1, 0.4)', overwrite: 'auto',
      });
    });
  }

  // ── Sliding indicator ─────────────────────────────────────────────────────
  onLinkEnter(e: MouseEvent): void {
    this.ngZone.runOutsideAngular(() => {
      const link      = e.currentTarget as HTMLElement;
      const indicator = this.indicatorRef.nativeElement;
      const wrapRect  = this.linksRef.nativeElement.getBoundingClientRect();
      const linkRect  = link.getBoundingClientRect();
      const x         = linkRect.left - wrapRect.left;
      const w         = linkRect.width;

      if (!this.indicatorVisible) {
        gsap.set(indicator, { x, width: w });
        gsap.to(indicator, { opacity: 1, duration: 0.28, ease: 'power2.out' });
        this.indicatorVisible = true;
      } else {
        this.qiX(x);
        this.qiW(w);
      }
    });
  }

  onLinksLeave(): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.to(this.indicatorRef.nativeElement, {
        opacity: 0, duration: 0.22, ease: 'power2.in',
        onComplete: () => { this.indicatorVisible = false; },
      });
    });
  }

  // ── Deep magnetic hover with rotateZ ─────────────────────────────────────
  onLinkMove(e: MouseEvent): void {
    this.ngZone.runOutsideAngular(() => {
      const link = e.currentTarget as HTMLElement;
      const r    = link.getBoundingClientRect();
      const nx   = (e.clientX - r.left) / r.width  - 0.5;
      const ny   = (e.clientY - r.top)  / r.height - 0.5;
      gsap.to(link, {
        x: nx * 18, y: ny * 12, rotateZ: nx * 2.8,
        transformPerspective: 700,
        duration: 0.28, ease: 'power2.out', overwrite: 'auto',
      });
    });
  }

  onLinkLeave(e: MouseEvent): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.to(e.currentTarget as HTMLElement, {
        x: 0, y: 0, rotateZ: 0,
        duration: 0.7, ease: 'elastic.out(1, 0.42)', overwrite: 'auto',
      });
    });
  }

  // ── CTA magnetic ─────────────────────────────────────────────────────────
  onCtaMove(e: MouseEvent): void {
    this.ngZone.runOutsideAngular(() => {
      const cta = this.ctaRef.nativeElement;
      const r   = cta.getBoundingClientRect();
      const x   = ((e.clientX - r.left) / r.width  - 0.5) * 14;
      const y   = ((e.clientY - r.top)  / r.height - 0.5) * 10;
      gsap.to(cta, { x, y, duration: 0.28, ease: 'power2.out', overwrite: 'auto' });
    });
  }

  onCtaLeave(): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.to(this.ctaRef.nativeElement, {
        x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.42)', overwrite: 'auto',
      });
    });
  }

  // ── Navigation helpers ────────────────────────────────────────────────────
  handleNavClick(link: NavLink): void {
    if (this.mobileOpen) this.closeMobile();
    if (link.type === 'scroll' && link.fragment) {
      this.scrollToSection(link.fragment);
    } else if (link.path) {
      this.router.navigate([link.path]);
    }
  }

  scrollToSection(id: string): void {
    const currentPath = this.router.url.split('#')[0];
    if (currentPath !== '/') {
      this.router.navigate(['/']).then(() =>
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400)
      );
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  isActive(link: NavLink): boolean {
    if (link.type === 'route') return this.router.url.split('#')[0] === link.path;
    return false;
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
    document.body.style.overflow = this.mobileOpen ? 'hidden' : '';
    this.cdr.detectChanges();
  }

  closeMobile(): void {
    this.mobileOpen = false;
    document.body.style.overflow = '';
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    document.body.style.overflow = '';
  }
}
