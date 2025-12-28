import { Component, signal } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { Navigation } from './core/components/navbar/navigation';
import { Footer } from './core/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,Navigation,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mon-app');
}
