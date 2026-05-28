import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ServiceData {
  title:        string;
  category:     string;
  description:  string;
  image:        string;
  deliverables: string[];
  year:         string;
}

@Component({
  selector:    'app-services',
  standalone:  false,
  templateUrl: './services.html',
  styleUrl:    './services.scss',
})
export class Services implements AfterViewInit, OnDestroy {

  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('headRef')    headRef!:    ElementRef<HTMLElement>;
  @ViewChild('listRef')    listRef!:    ElementRef<HTMLElement>;
  @ViewChild('cursorEl')   cursorEl!:   ElementRef<HTMLElement>;

  services: ServiceData[] = [
    {
      title:        'Web Design & Development',
      category:     'Digital Products',
      year:         '2024',
      image:        'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
      description:  'Immersive, award-winning web platforms that combine bleeding-edge visual aesthetics with blazing performance. Interactive narratives, flawless responsiveness, and code built to last.',
      deliverables: ['Interactive Front-end', 'Creative Technology', 'Headless CMS', 'Web Performance'],
    },
    {
      title:        '3D Visual Storytelling',
      category:     'WebGL Experience',
      year:         '2024',
      image:        'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80',
      description:  'Custom WebGL environments that captivate and convert. Shader development, physically-based lighting, optimised geometries, and real-time rendering pipelines built for the web.',
      deliverables: ['WebGL Environments', 'Shader Development', '3D Asset Optimisation', 'Interactive Simulations'],
    },
    {
      title:        'Motion & Animation',
      category:     'Dynamic Branding',
      year:         '2023',
      image:        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      description:  'Fluid, choreographed motion that turns static interfaces into living experiences. Micro-interactions, scroll-driven sequences, and entrance animations — all polished to perfection.',
      deliverables: ['GSAP Timelines', 'Lottie & Rive', 'UI Micro-interactions', 'Scroll Animations'],
    },
    {
      title:        'Interactive Experiences',
      category:     'Creative Technology',
      year:         '2024',
      image:        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      description:  'Bespoke digital installations, games, and rich interactive applications that surprise, delight, and retain visitors through the lens of game-design principles.',
      deliverables: ['Gamified Websites', 'Installations', 'Audio-visual Synthesis', 'Physics Interfaces'],
    },
    {
      title:        'Brand Identity',
      category:     'Art Direction',
      year:         '2023',
      image:        'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
      description:  'Defining the core essence of modern brands. We establish typography systems, colour language, and visual guidelines aligned with ambitious digital-first organisations.',
      deliverables: ['Logo & Brandmarks', 'Typography Systems', 'Visual Identity', 'Design Systems'],
    },
    {
      title:        'Creative Direction',
      category:     'Strategy & Concept',
      year:         '2024',
      image:        'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80',
      description:  'The vision that unites design, technology, and strategy. We provide creative direction that shapes memorable digital narratives and guides multi-disciplinary teams with clarity.',
      deliverables: ['Concept Development', 'Interface Strategy', 'UX Copy', 'Aesthetic Consultation'],
    },
  ];

  activeIndex: number | null = null;

  private ctx!: gsap.Context;
  private qx!: gsap.QuickToFunc;
  private qy!: gsap.QuickToFunc;

  constructor(
    private host: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const cursor = this.cursorEl.nativeElement;

      // ── Cursor follower ─────────────────────────────────────────────────
      gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
      this.qx = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3.out' });
      this.qy = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3.out' });

      // ── Entrance animations ─────────────────────────────────────────────
      this.ctx = gsap.context(() => {

        // Header
        const headItems = this.headRef.nativeElement.querySelectorAll('[data-reveal]');
        gsap.fromTo(headItems,
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: this.headRef.nativeElement, start: 'top 82%', once: true },
          },
        );

        // Dividers scale in
        const dividers = this.listRef.nativeElement.querySelectorAll('.srv-line');
        gsap.fromTo(dividers,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.9, stagger: 0.06, ease: 'expo.out',
            scrollTrigger: { trigger: this.listRef.nativeElement, start: 'top 80%', once: true },
          },
        );

        // Rows slide in
        const rows = this.listRef.nativeElement.querySelectorAll('.srv-item');
        gsap.fromTo(rows,
          { opacity: 0, x: -28 },
          { opacity: 1, x: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: this.listRef.nativeElement, start: 'top 78%', once: true },
          },
        );

      }, this.host.nativeElement);
    });
  }

  // ── Global mouse move (updates cursor follower) ──────────────────────────
  onSectionMove(e: MouseEvent): void {
    this.ngZone.runOutsideAngular(() => {
      this.qx(e.clientX);
      this.qy(e.clientY);
    });
  }

  // ── Per-row events ───────────────────────────────────────────────────────
  onItemEnter(e: MouseEvent, i: number): void {
    const item   = e.currentTarget as HTMLElement;
    const cursor = this.cursorEl.nativeElement;

    this.ngZone.runOutsideAngular(() => {
      // Show cursor image, switch to hovered service's image
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)', overwrite: 'auto' });
      cursor.querySelectorAll<HTMLElement>('.c-img').forEach((img, j) => {
        gsap.to(img, { opacity: j === i ? 1 : 0, duration: 0.35, overwrite: 'auto' });
      });

      // Row translate + accent colour on number
      gsap.to(item.querySelector('.srv-row-inner'), { x: 18, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(item.querySelector('.srv-num'),       { color: '#4060ff', duration: 0.25 });
      gsap.to(item.querySelector('.srv-arrow-icon'), { rotate: -45, x: 4, duration: 0.35, ease: 'power2.out' });
    });
  }

  onItemLeave(e: MouseEvent): void {
    const item   = e.currentTarget as HTMLElement;
    const cursor = this.cursorEl.nativeElement;

    this.ngZone.runOutsideAngular(() => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.25, ease: 'power2.in', overwrite: 'auto' });
      gsap.to(item.querySelector('.srv-row-inner'), { x: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(item.querySelector('.srv-num'),       { color: 'rgba(255,255,255,0.1)', duration: 0.3 });
      gsap.to(item.querySelector('.srv-arrow-icon'), { rotate: 0, x: 0, duration: 0.4, ease: 'power2.out' });
      // Reset 3D tilt
      gsap.to(item, { rotateX: 0, rotateY: 0, duration: 0.55, ease: 'power2.out', overwrite: 'auto' });
    });
  }

  onItemMove(e: MouseEvent): void {
    const item = e.currentTarget as HTMLElement;
    const rect = item.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width;
    const y    = (e.clientY - rect.top)  / rect.height;
    const ry   = (x - 0.5) * 8;
    const rx   = (y - 0.5) * -5;

    this.ngZone.runOutsideAngular(() => {
      gsap.to(item, {
        rotateX: rx, rotateY: ry,
        transformPerspective: 1100,
        duration: 0.35, ease: 'power2.out', overwrite: 'auto',
      });
    });
  }

  // ── Click: expand / collapse service detail ──────────────────────────────
  toggleItem(i: number): void {
    const prev = this.activeIndex;

    if (prev === i) {
      // Collapse current
      this.collapseDetail(i);
      this.ngZone.run(() => { this.activeIndex = null; this.cdr.detectChanges(); });
    } else {
      // Collapse old, expand new
      if (prev !== null) this.collapseDetail(prev);
      this.ngZone.run(() => { this.activeIndex = i; this.cdr.detectChanges(); });
      setTimeout(() => this.expandDetail(i), 20);
    }
  }

  private expandDetail(i: number): void {
    const panel = this.host.nativeElement.querySelector<HTMLElement>(`.srv-detail[data-idx="${i}"]`);
    if (!panel) return;
    const h = panel.scrollHeight;
    this.ngZone.runOutsideAngular(() => {
      gsap.fromTo(panel,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.55, ease: 'power3.out',
          onComplete: () => { panel.style.height = 'auto'; },
        },
      );
      gsap.fromTo(panel.querySelectorAll('[data-detail]'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out', delay: 0.12 },
      );
    });
  }

  private collapseDetail(i: number): void {
    const panel = this.host.nativeElement.querySelector<HTMLElement>(`.srv-detail[data-idx="${i}"]`);
    if (!panel) return;
    panel.style.height = panel.offsetHeight + 'px'; // lock before animating
    this.ngZone.runOutsideAngular(() => {
      gsap.to(panel, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.inOut' });
    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
