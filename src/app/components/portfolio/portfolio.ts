import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, ProjectDetail } from '../../data/projects.data';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-portfolio',
  standalone: false,
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements AfterViewInit, OnDestroy {
  @ViewChild('headerRef') headerRef!: ElementRef;
  @ViewChild('gridRef')   gridRef!:   ElementRef;
  @ViewChild('ctaRef')    ctaRef!:    ElementRef;

  projects: ProjectDetail[] = PROJECTS;
  filters = ['All', 'Dev', 'Design', 'Motion'];
  activeFilter = 'All';

  get isPortfolioPage(): boolean {
    return this.router.url === '/portfolio';
  }

  get filteredProjects(): ProjectDetail[] {
    if (this.activeFilter === 'All') return this.projects;
    return this.projects.filter(p => p.category === this.activeFilter);
  }

  private ctx!: gsap.Context;

  // Typed handler maps for clean cleanup
  private moveHandlers  = new Map<HTMLElement, (e: PointerEvent) => void>();
  private leaveHandlers = new Map<HTMLElement, () => void>();
  private clickHandlers = new Map<HTMLElement, (e: MouseEvent) => void>();

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        if (this.headerRef?.nativeElement) {
          gsap.fromTo(
            this.headerRef.nativeElement,
            { opacity: 0, y: 60 },
            {
              opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
              scrollTrigger: { trigger: this.headerRef.nativeElement, start: 'top 82%', once: true },
            },
          );
        }

        this.animateCards();

        if (this.ctaRef?.nativeElement) {
          gsap.fromTo(
            this.ctaRef.nativeElement,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: this.ctaRef.nativeElement, start: 'top 88%', once: true },
            },
          );
        }
      });

      this.bindCardInteractions();
    });
  }

  private animateCards(): void {
    setTimeout(() => {
      const cards = this.gridRef?.nativeElement.querySelectorAll('.project-card') as NodeListOf<HTMLElement>;
      if (!cards?.length) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 55, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.85, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: this.gridRef.nativeElement, start: 'top 78%', once: true },
        },
      );
    }, 20);
  }

  private readonly isTouch = window.matchMedia('(hover: none)').matches;

  private bindCardInteractions(): void {
    setTimeout(() => {
      const cards = this.gridRef?.nativeElement.querySelectorAll('.project-card') as NodeListOf<HTMLElement>;
      if (!cards?.length) return;

      this.cleanupCardHandlers();

      cards.forEach((card: HTMLElement) => {
        const projectId = card.getAttribute('data-project-id');

        const onMove = (e: PointerEvent) => {
          if (this.isTouch) return; // skip 3D tilt on touch
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top)  / rect.height;
          const rx = (y - 0.5) * -20;
          const ry = (x - 0.5) *  20;
          card.style.setProperty('--gx', `${x * 100}%`);
          card.style.setProperty('--gy', `${y * 100}%`);
          gsap.to(card, {
            rotateX: rx,
            rotateY: ry,
            transformPerspective: 900,
            ease: 'power2.out',
            duration: 0.35,
            overwrite: 'auto',
          });
        };

        const onLeave = () => {
          if (this.isTouch) return;
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.9,
            ease: 'elastic.out(1, 0.45)',
            overwrite: 'auto',
          });
        };

        const onClick = () => {
          gsap.to(card, {
            scale: 0.94,
            duration: 0.12,
            ease: 'power2.in',
            onComplete: () => {
              window.scrollTo(0, 0);
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
              this.ngZone.run(() => this.router.navigate(['/portfolio', projectId]));
            },
          });
        };

        card.addEventListener('pointermove', onMove);
        card.addEventListener('pointerleave', onLeave);
        card.addEventListener('click', onClick);

        this.moveHandlers.set(card, onMove);
        this.leaveHandlers.set(card, onLeave);
        this.clickHandlers.set(card, onClick as EventListener);
      });
    }, 20);
  }

  private cleanupCardHandlers(): void {
    this.moveHandlers.forEach((fn, el) => el.removeEventListener('pointermove', fn));
    this.leaveHandlers.forEach((fn, el) => el.removeEventListener('pointerleave', fn));
    this.clickHandlers.forEach((fn, el) => el.removeEventListener('click', fn));
    this.moveHandlers.clear();
    this.leaveHandlers.clear();
    this.clickHandlers.clear();
  }

  setFilter(f: string): void {
    if (this.activeFilter === f) return;
    this.activeFilter = f;
    this.cdr.detectChanges();
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        const cards = this.gridRef?.nativeElement.querySelectorAll('.project-card') as NodeListOf<HTMLElement>;
        if (cards?.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 22, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.07 },
          );
        }
        this.bindCardInteractions();
      }, 20);
    });
  }

  trackById(_: number, p: ProjectDetail): number { return p.id; }

  navigateAll(): void {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.router.navigate(['/portfolio']);
  }

  ngOnDestroy(): void {
    this.cleanupCardHandlers();
    this.ctx?.revert();
  }
}
