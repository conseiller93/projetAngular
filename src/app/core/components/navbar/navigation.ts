import { Component, OnInit, Renderer2 } from '@angular/core'; // Renderer2 pour manipuler le DOM proprement
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { AuthService } from '../../auth/auth'; 
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navigation.html',
})
export class Navigation implements OnInit {
  open = false;
  isDarkMode = false; // État du mode sombre

  constructor(
    private router: Router, 
    public authService: AuthService,
    private renderer: Renderer2 // Injecté pour modifier la classe sur <html>
  ) {
    // Fermer automatiquement le menu mobile lors d'un changement de page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.open = false;
    });
  }

  ngOnInit(): void {
    this.checkTheme();
  }

  // --- LOGIQUE DU MODE SOMBRE ---

  private checkTheme(): void {
    // 1. Vérifie le choix sauvegardé
    const savedTheme = localStorage.getItem('theme');
    // 2. Vérifie la préférence du système (si pas de choix sauvegardé)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.isDarkMode = true;
      this.renderer.addClass(document.documentElement, 'dark');
    }
  }


   // Extrait de ton Navigation.ts
toggleDarkMode(): void {
  this.isDarkMode = !this.isDarkMode;
  
  if (this.isDarkMode) {
    // Ajoute .dark sur <html> (Tout le site réagit)
    this.renderer.addClass(document.documentElement, 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    // Retire .dark de <html>
    this.renderer.removeClass(document.documentElement, 'dark');
    localStorage.setItem('theme', 'light');
  }
}

  // --- AUTRES FONCTIONS ---

  onLogout(): void {
    this.authService.logout();
  }

  get favCount(): number {
    const saved = localStorage.getItem('country_favs'); // Corrigé pour tes favoris pays
    return saved ? JSON.parse(saved).length : 0;
  }
}
