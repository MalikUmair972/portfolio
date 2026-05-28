import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  year = new Date().getFullYear();

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
