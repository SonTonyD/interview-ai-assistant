import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {}

  navigateTo(route: string, itemId?: string) {
    if (itemId === undefined) {
      this.router.navigate([route]);
    } else {
      this.router.navigate([route, itemId]);
    }
  }
}
