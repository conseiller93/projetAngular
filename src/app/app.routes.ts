import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './core/components/home/home';
import { ListePays } from './paysmonde/pages/liste-pays/liste-pays';
import { DetailPays } from './paysmonde/pages/detail-pays/detail-pays';
import { ListesPokemons } from './pokemons/pages/listes-pokemons/listes-pokemons';
import { DetailsPokemons  } from './pokemons/pages/details-pokemons/details-pokemons';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guards';
import {Login} from './login/login'


export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' }, // 🟢 page publique
  {path:'login',component:Login},
  { path: 'pays', component: ListePays, canActivate: [AuthGuard] }, // 🔒 protégé
  { path: 'pays/:name', component: DetailPays, canActivate: [AuthGuard] }, // 🔒 protégé
  { path: 'pokemon', component: ListesPokemons, canActivate: [AuthGuard] }, // 🔒 protégé
  { path: 'pokemon/:id', component: DetailsPokemons, canActivate: [AuthGuard] }, // 🔒 protégé
];

