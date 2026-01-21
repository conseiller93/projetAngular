import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

 canActivate(): boolean {
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  // 🔹 sauvegarde l’URL demandée
  localStorage.setItem('redirectUrl', this.router.url);

  this.router.navigate(['/login']);
  return false;
}


}
