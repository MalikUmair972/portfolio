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
      title:        'Full-Stack Application Development',
      category:     'Angular · .NET · SQL Server',
      year:         '2024',
      image:        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      description:  'End-to-end web application development — Angular on the frontend, .NET Web API on the backend, and SQL Server underneath. From authentication and role-based access control to complex business workflows, I build production-ready systems that scale.',
      deliverables: ['Angular SPA', '.NET Web API', 'SQL Server DB', 'Role-based Auth'],
    },
    {
      title:        'ERP & SaaS Platform Engineering',
      category:     'Enterprise Systems',
      year:         '2024',
      image:        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      description:  'Custom ERP and SaaS platforms built from the ground up — multi-module, multi-tenant, and production-hardened. Inventory management, procurement workflows, POS systems, and approval chains delivered as a unified Angular + .NET solution.',
      deliverables: ['Multi-module ERP', 'SaaS Architecture', 'Approval Workflows', 'Multi-tenancy'],
    },
    {
      title:        'API & Backend Development',
      category:     '.NET · REST · Dapper',
      year:         '2024',
      image:        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      description:  'High-performance REST APIs built with .NET — clean architecture, Dapper and ADO.NET for data access, and SQL Server stored procedures for complex queries. Designed for speed, security, and maintainability from day one.',
      deliverables: ['.NET REST API', 'Dapper & ADO.NET', 'Stored Procedures', 'Clean Architecture'],
    },
    {
      title:        'Database Design & Optimisation',
      category:     'SQL Server',
      year:         '2024',
      image:        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      description:  'SQL Server schema design, query optimisation, and data modelling for systems that handle millions of rows. Normalised schemas, indexed views, partitioned tables, and ETL pipelines that keep reporting dashboards fast even over 10+ years of historical data.',
      deliverables: ['Schema Design', 'Query Optimisation', 'Indexed Views', 'ETL Pipelines'],
    },
    {
      title:        'Ecommerce & Third-party Integrations',
      category:     'Shopify · BigCommerce · WooCommerce',
      year:         '2024',
      image:        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
      description:  'Seamless integrations between .NET backends and ecommerce platforms — Shopify, BigCommerce, WooCommerce, and Magento. Automatic order sync, real-time inventory updates, multi-carrier shipping automation, and webhook-driven event pipelines.',
      deliverables: ['Shopify Integration', 'Order & Inventory Sync', 'Carrier Automation', 'Webhook Pipelines'],
    },
    {
      title:        'Analytics Dashboards & Reporting',
      category:     'BI · Charts · Data Export',
      year:         '2024',
      image:        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      description:  'Business intelligence dashboards built in Angular — interactive charts, KPI scorecards, period-over-period comparisons, and drill-down navigation over years of historical data. PDF and Excel export included as standard.',
      deliverables: ['Interactive Charts', 'KPI Dashboards', 'Period Comparisons', 'PDF & Excel Export'],
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
  // Use section-relative coords — contain:layout on app-services makes the
  // cursor's position: absolute relative to the section, not the viewport,
  // so clientX/Y (viewport coords) would place it in the wrong spot.
  onSectionMove(e: MouseEvent): void {
    this.ngZone.runOutsideAngular(() => {
      const rect = this.sectionRef.nativeElement.getBoundingClientRect();
      this.qx(e.clientX - rect.left);
      this.qy(e.clientY - rect.top);
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
