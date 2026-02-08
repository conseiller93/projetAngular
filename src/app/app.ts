import { Component, signal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './core/components/navbar/navigation';
import { Footer } from './core/components/footer/footer';
import { AuthService } from './core/auth/auth'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navigation, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mon-app');

  constructor(public authService: AuthService) {}

  @HostListener('window:mousemove')
  @HostListener('window:mousedown')
  @HostListener('window:keypress')
  @HostListener('window:touchstart')
  @HostListener('window:scroll') // Ajouté pour plus de précision
  handleUserActivity() {
    if (this.authService) {
      this.authService.refreshActivity();
    }
  }
 
}