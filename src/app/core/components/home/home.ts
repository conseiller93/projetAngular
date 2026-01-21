import { Component, OnInit } from '@angular/core';
import { Pokemonservice } from '../../services/pokemonservice';
import { Countryservice } from '../../services/countryservice';
import { DetailsPokemons  } from '../../../pokemons/pages/details-pokemons/details-pokemons';
import { DetailPays } from '../../../paysmonde/pages/detail-pays/detail-pays';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  pokemons: any[] = [];
  countries: any[] = [];

  filteredPokemons: any[] = [];
  filteredCountries: any[] = [];

  searchTerm: string = '';

  constructor(
    private pokemonService: Pokemonservice,
    private countryService: Countryservice
  ) {}
   encode(value: string): string {
    return encodeURIComponent(value);
  }

  ngOnInit(): void {
    // Charger tous les Pokémon
    this.pokemonService.getPokemons().subscribe((data: any) => {
      this.pokemons = data.results; 
    });

    // Charger tous les pays
    this.countryService.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
      // Méthode pour encoder le nom d’un pays
 

  }
  getPokemonId(url: string): string {
  // Extrait l'ID de l'URL de l'API
  return url.split('/').filter(Boolean).pop()!;
}


  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      // 🔹 Champ vide → aucun résultat affiché
      this.filteredPokemons = [];
      this.filteredCountries = [];
      return;
    }

    // 🔹 Filtrer Pokémon (commence par)
    this.filteredPokemons = this.pokemons.filter(p =>
      p.name.toLowerCase().startsWith(term)
    );

    // 🔹 Filtrer Pays (commence par)
    this.filteredCountries = this.countries.filter(c =>
      c.name?.common?.toLowerCase().startsWith(term)
    );
  }
}


