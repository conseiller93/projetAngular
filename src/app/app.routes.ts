import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './core/components/home/home';
import { ListePays } from './paysmonde/pages/liste-pays/liste-pays';
import { DetailPays } from './paysmonde/pages/detail-pays/detail-pays';
import { ListesPokemons } from './pokemons/pages/listes-pokemons/listes-pokemons';
import { DetailsPokemons  } from './pokemons/pages/details-pokemons/details-pokemons';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guards';
import { AdminUsers } from './core/components/admin-users/admin-users';
import {LoginComponent} from './login/login';
import { adminGuard } from './guards/admin.guard';
import { FavorisComponent } from './favoris/favoris';
// ... importe tes autres composants (Home, ListePays, etc.)

export const routes: Routes = [
  // 1. La racine doit rediriger vers l'accueil (qui est protégé)
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },

  // 2. La page de login
  { path: 'login', component: LoginComponent },

  // 3. Les pages protégées
  { path: 'accueil', component: Home, canActivate: [AuthGuard] },
  { path: 'pays', component: ListePays, canActivate: [AuthGuard] },
  { path: 'pays/:name', component: DetailPays, canActivate: [AuthGuard] },
  { path: 'pokemon', component: ListesPokemons, canActivate: [AuthGuard] },
  { path: 'pokemon/:id', component: DetailsPokemons, canActivate: [AuthGuard] },
  { 
    path: 'utilisateurs', component: AdminUsers, canActivate: [adminGuard] // 🛡️ Protection activée ici
  },
   { path: 'favoris', component: FavorisComponent,canActivate: [AuthGuard] }, // Protéger la page des favoris aussi,
  // 4. (Optionnel) Redirection pour les URLs inconnues
  { path: '**', redirectTo: 'accueil' },
 
];

