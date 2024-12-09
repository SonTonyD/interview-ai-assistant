import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  navigateTo(route: string, itemId?: string) {
    if (itemId === undefined) {
      this.router.navigate([route]);
    } else {
      this.router.navigate([route, itemId]);
    }
  }
}
