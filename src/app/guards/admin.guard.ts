import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../core/auth/auth';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true; // Accès autorisé
  }

  // Si l'utilisateur est connecté mais n'est PAS admin
  if (authService.isLoggedIn()) {
    alert("Accès refusé : Réservé aux administrateurs.");
    router.navigate(['/accueil']);
    return false;
  }

  // Si pas connecté du tout
  router.navigate(['/login']);
  return false;
};