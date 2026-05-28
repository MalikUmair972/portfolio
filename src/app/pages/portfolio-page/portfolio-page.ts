import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-page',
  standalone: false,
  templateUrl: './portfolio-page.html',
  styleUrl: './portfolio-page.scss',
})
export class PortfolioPage implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}
