import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Pokemonservice } from '../../services/pokemonservice';
import { Countryservice } from '../../services/countryservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
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

  ngOnInit(): void {
    // Charger tous les Pokémon
    this.pokemonService.getPokemons().subscribe((data: any) => {
      this.pokemons = data.results; // selon l'API PokeAPI
      this.filteredPokemons = this.pokemons;
    });

    // Charger tous les pays
    this.countryService.getCountries().subscribe((data: any) => {
      this.countries = data;
      this.filteredCountries = this.countries;
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();

    // Filtrer Pokémon
    this.filteredPokemons = this.pokemons.filter(p =>
      p.name.toLowerCase().includes(term)
    );

    // Filtrer pays
    this.filteredCountries = this.countries.filter(c =>
      c.name.common.toLowerCase().includes(term)
    );
  }
}
