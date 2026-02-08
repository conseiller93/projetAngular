// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../core/auth/auth';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // On vérifie le signal OU le localStorage en direct
  const isAuth = authService.isLoggedIn() || localStorage.getItem('isLoggedIn') === 'true';

  if (isAuth) {
    return true;
  }

  // Si on n'est pas connecté, on redirige
  console.warn("Accès refusé par le Guard !");
  router.navigate(['/login']);
  return false;
};