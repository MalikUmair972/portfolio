import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import { gsap } from 'gsap';

// ── GSAP global performance config ────────────────────────────────────────────
gsap.config({
  force3D: true,         // always use matrix3d — GPU composite path
  nullTargetWarn: false, // silence missing-element warnings
});
gsap.defaults({
  ease: 'power2.out',
  overwrite: 'auto',      // prevents animation stacking / memory leaks
});

platformBrowser().bootstrapModule(AppModule, {})
  .catch(err => console.error(err));
