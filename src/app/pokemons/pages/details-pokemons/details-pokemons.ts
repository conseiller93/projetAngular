import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details-pokemons',
  templateUrl: './details-pokemons.html',
  imports: [CommonModule, RouterLink],
})
export class DetailsPokemons implements OnInit {
  pokemon: any;
  isLoading:boolean = true;

  typesText: string = '';
  abilitiesText: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
if (!id) return;

this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe({
      next: (data: any) => {
        this.pokemon = data;

        // Préparer le texte des types et capacités
        this.typesText = this.pokemon.types.map((t: any) => t.type.name).join(', ');
        this.abilitiesText = this.pokemon.abilities.map((a: any) => a.ability.name).join(', ');

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        console.error('Erreur API Pokémon');
      },
    });
  }
}


