import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PokemonService } from '../../pokemonservise';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-listes-pokemons ',
  imports: [CommonModule,RouterModule],
  templateUrl: './listes-pokemons.html',
  styleUrl: './listes-pokemons.css',
})
export class ListesPokemons implements OnInit {

  pokemons: any[] = [];
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.http
      .get<any>('https://pokeapi.co/api/v2/pokemon?limit=200')
      .subscribe({
        next: (data) => {
          this.pokemons = data.results; // ✅ IMPORTANT
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  getPokemonId(url: string): string {
    return url.split('/').filter(Boolean).pop()!;
  }
}

