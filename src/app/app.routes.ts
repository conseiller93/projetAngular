import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './core/components/home/home';
import { ListePays } from './paysmonde/pages/liste-pays/liste-pays';
import { DetailPays } from './paysmonde/pages/detail-pays/detail-pays';
import { ListesPokemons } from './pokemons/pages/listes-pokemons/listes-pokemons';
import { DetailsPokemons  } from './pokemons/pages/details-pokemons/details-pokemons';
import { RouterModule } from '@angular/router';

export const routes: Routes = [
    {path:'',component:Home,pathMatch:'full'},
    {path:'pays',component:ListePays},
    {path:'pays/:name',component:DetailPays },
    {path:'pokemon',component:ListesPokemons},
    {path:'pokemon/:id',component:DetailsPokemons},
];
