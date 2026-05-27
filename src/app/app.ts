import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Guarantee scroll-to-top on every route change.
    // scrollPositionRestoration:'top' fires too early (before the new view
    // renders); this fires on NavigationEnd which is after Angular has
    // activated the new component, giving us a reliable reset point.
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
  }
}
