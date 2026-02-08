import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/auth/auth'; // Vérifie ton chemin

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  username = '';
  password = '';
  rememberMe = false; // Doit être identique au ngModel du HTML

  constructor(public authService: AuthService) {} // public pour le debug

onLogin() {
  const users = this.authService.getUsers();
  const userFound = users.find(u => 
    u.username === this.username && u.password === this.password
  );

  if (userFound) {
    if (userFound.isBlocked) {
      alert("Compte bloqué !");
      return;
    }

    // 1. On remonte tout en haut de la fenêtre avant de changer de page
    window.scrollTo(0, 0);

    // 2. On envoie le RÔLE (ADMIN ou USER) au service
    this.authService.login(userFound.role, this.rememberMe);
    
    // Note : Si ta méthode authService.login() ne fait pas de redirection,
    // n'oublie pas d'ajouter this.router.navigate(['/accueil']); ici.
    
  } else {
    alert("Identifiants incorrects.");
  }
}
}