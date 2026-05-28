export interface AntigravityOptions {
  strength?: number;
  radius?: number;
  spring?: number;
  damping?: number;
}

export class AntigravityRepeller {
  private container: HTMLElement;
  private spans: HTMLElement[] = [];
  private letterData: Array<{
    el: HTMLElement;
    baseX: number;
    baseY: number;
    width: number;
    height: number;
    currentX: number;
    currentY: number;
    vx: number;
    vy: number;
  }> = [];

  private mouseX = -99999;
  private mouseY = -99999;
  private rafId: number | null = null;

  private strength: number;
  private radius: number;
  private spring: number;
  private damping: number;

  constructor(element: HTMLElement, options: AntigravityOptions = {}) {
    this.container = element;
    this.strength = options.strength ?? 1.0;
    this.radius = options.radius ?? 120;
    this.spring = options.spring ?? 0.08;
    this.damping = options.damping ?? 0.82;

    this.init();
  }

  private init(): void {
    const text = this.container.textContent || '';
    this.container.innerHTML = '';

    // Style container to support offset calculation
    const style = window.getComputedStyle(this.container);
    if (style.position === 'static') {
      this.container.style.position = 'relative';
    }
    this.container.style.display = style.display === 'block' ? 'block' : 'inline-block';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement('span');
      if (char === ' ') {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = char;
      }
      span.style.display = 'inline-block';
      span.style.position = 'relative';
      span.style.willChange = 'transform';
      this.container.appendChild(span);
      this.spans.push(span);
    }

    this.cacheMetrics();

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseleave', this.onMouseLeave);
    window.addEventListener('resize', this.onResize);

    this.animate();
  }

  private cacheMetrics = (): void => {
    this.letterData = this.spans.map((span) => {
      return {
        el: span,
        baseX: span.offsetLeft,
        baseY: span.offsetTop,
        width: span.offsetWidth,
        height: span.offsetHeight,
        currentX: 0,
        currentY: 0,
        vx: 0,
        vy: 0
      };
    });
  };

  private onMouseMove = (e: MouseEvent): void => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  private onMouseLeave = (): void => {
    this.mouseX = -99999;
    this.mouseY = -99999;
  };

  private onResize = (): void => {
    this.cacheMetrics();
  };

  private animate = (): void => {
    if (!this.container || this.letterData.length === 0) return;

    const rect = this.container.getBoundingClientRect();

    for (let i = 0; i < this.letterData.length; i++) {
      const data = this.letterData[i];
      const letterCenterX = rect.left + data.baseX + data.width / 2;
      const letterCenterY = rect.top + data.baseY + data.height / 2;

      const dx = letterCenterX - this.mouseX;
      const dy = letterCenterY - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetX = 0;
      let targetY = 0;

      if (dist < this.radius && this.mouseX > -90000) {
        // Force calculation: stronger as mouse gets closer
        const ratio = 1.0 - dist / this.radius;
        const force = ratio * this.strength * 45; // Max 45px displacement

        if (dist > 0.1) {
          targetX = (dx / dist) * force;
          targetY = (dy / dist) * force;
        } else {
          // Fallback if cursor is exactly on the center
          targetX = (Math.random() - 0.5) * force;
          targetY = (Math.random() - 0.5) * force;
        }
      }

      // Spring physics
      const ax = (targetX - data.currentX) * this.spring;
      data.vx = (data.vx + ax) * this.damping;
      data.currentX += data.vx;

      const ay = (targetY - data.currentY) * this.spring;
      data.vy = (data.vy + ay) * this.damping;
      data.currentY += data.vy;

      // Apply transform only if moved
      if (Math.abs(data.currentX) > 0.01 || Math.abs(data.currentY) > 0.01) {
        data.el.style.transform = `translate3d(${data.currentX.toFixed(2)}px, ${data.currentY.toFixed(2)}px, 0)`;
      } else {
        data.el.style.transform = 'none';
      }
    }

    this.rafId = requestAnimationFrame(this.animate);
  };

  public destroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseleave', this.onMouseLeave);
    window.removeEventListener('resize', this.onResize);
    this.container.innerHTML = '';
  }
}
