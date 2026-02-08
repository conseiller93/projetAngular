import { Injectable, NgZone, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  
  // --- ÉTAT RÉACTIF ---
  // On initialise le signal en vérifiant si on est sur le navigateur
  isLoggedIn = signal<boolean>(this.checkAuth());
  
  private userActivity = new Subject<void>();
  private idleSubscription?: Subscription;
  
  private readonly AUTH_KEY = 'isLoggedIn';
  private readonly USERS_KEY = 'app_users';

  constructor(private router: Router, private ngZone: NgZone) {
    // On n'exécute ces logiques que sur le client
    if (isPlatformBrowser(this.platformId)) {
      this.seedAdmin();      
      this.initTabSync();    
      this.setupIdleTimer(); 
    }
  }

  private checkAuth(): boolean {
    // Crucial pour éviter l'erreur NG0505 et le blocage à "false"
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.AUTH_KEY) === 'true';
    }
    return false;
  }

  // --- GESTION DES UTILISATEURS (CRUD & ACTIONS) ---
  
  private seedAdmin() {
    const users = this.getUsers();
    if (users.length === 0) {
      const admin = {
        id: Date.now(),
        username: 'admin',
        password: '32117c',
        isBlocked: false,
        role: 'ADMIN'
      };
      localStorage.setItem(this.USERS_KEY, JSON.stringify([admin]));
    }
  }

  getUsers(): any[] {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    }
    return [];
  }

  // --- LOGIQUE ADMIN & CRUD DANS auth.ts ---

// Ajouter un utilisateur avec un MDP choisi
addUser(username: string, password: string) {
  const users = this.getUsers();
  const newUser = {
    id: Date.now(),
    username: username,
    password: password, 
    isBlocked: false,
    role: 'USER'
  };
  users.push(newUser);
  localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
}

// Réinitialiser avec un MDP choisi
resetPassword(userId: number, newPassword: string) {
  const users = this.getUsers().map((u: any) => {
    if (u.id === userId) u.password = newPassword; 
    return u;
  });
  localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
}

  deleteUser(userId: number) {
    const users = this.getUsers().filter((u: any) => u.id !== userId);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  toggleBlockUser(userId: number) {
    const users = this.getUsers().map((u: any) => {
      if (u.id === userId) u.isBlocked = !u.isBlocked;
      return u;
    });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // --- LOGIQUE MULTI-ONGLETS & INACTIVITÉ ---

  private initTabSync() {
    window.addEventListener('storage', (event) => {
      if (event.key === this.AUTH_KEY) {
        const status = event.newValue === 'true';
        this.isLoggedIn.set(status);
        if (!status) this.logout(false);
      }
      if (event.key === 'lastActivity') {
        this.userActivity.next();
      }
    });
  }

  private setupIdleTimer() {
    this.idleSubscription = this.userActivity
      .pipe(
        switchMap(() => {
          if (!this.isLoggedIn()) return []; 
          const keepAlive = isPlatformBrowser(this.platformId) && localStorage.getItem('keepAlive') === 'true';
          return timer(keepAlive ? 999999999 : 5000);
        })
      )
      .subscribe(() => {
        if (this.isLoggedIn()) {
          console.warn("Inactivité détectée : Déconnexion automatique");
          this.logout();
        }
      });
  }

  refreshActivity() {
    this.userActivity.next();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lastActivity', Date.now().toString());
    }
  }

// --- ACTIONS D'AUTHENTIFICATION ---

  // On ajoute "role" en paramètre pour savoir qui se connecte
  login(role: string = 'USER', stayConnected: boolean = false) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.AUTH_KEY, 'true'); 
      localStorage.setItem('userRole', role); // <-- TRÈS IMPORTANT : On stocke le rôle ici
      
      this.isLoggedIn.set(true); 

      if (stayConnected) {
        localStorage.setItem('keepAlive', 'true');
      }

      this.refreshActivity();
      this.router.navigate(['/accueil']);
    }
  }

  logout(notifyOthers = true) {
    if (isPlatformBrowser(this.platformId)) {
      if (notifyOthers) {
        localStorage.setItem(this.AUTH_KEY, 'false');
      }
      localStorage.removeItem(this.AUTH_KEY);
      localStorage.removeItem('keepAlive');
      localStorage.removeItem('userRole'); // <-- On nettoie aussi le rôle
      
      this.isLoggedIn.set(false);
      this.router.navigate(['/login']);
    }
  }

  isAdmin(): boolean {
    if (!this.isLoggedIn()) return false;
    if (isPlatformBrowser(this.platformId)) {
      // On vérifie simplement le rôle stocké au login
      return localStorage.getItem('userRole') === 'ADMIN';
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

}