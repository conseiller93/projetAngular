import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favoris.html'
})
export class FavorisComponent implements OnInit {
  pokemonFavorites: any[] = [];
  countryFavorites: any[] = [];

  ngOnInit(): void {
    this.refreshAll();
  }

  refreshAll() {
    // Charger Pokémon
    const pFavs = localStorage.getItem('poke_favs');
    this.pokemonFavorites = pFavs ? JSON.parse(pFavs) : [];

    // Charger Pays
    const cFavs = localStorage.getItem('country_favs');
    this.countryFavorites = cFavs ? JSON.parse(cFavs) : [];
  }

  removePokemonFavorite(id: number, event: Event) {
    event.stopPropagation();
    this.pokemonFavorites = this.pokemonFavorites.filter(p => p.id !== id);
    localStorage.setItem('poke_favs', JSON.stringify(this.pokemonFavorites));
  }

  removeCountryFavorite(name: string, event: Event) {
    event.stopPropagation();
    this.countryFavorites = this.countryFavorites.filter(c => c.name !== name);
    localStorage.setItem('country_favs', JSON.stringify(this.countryFavorites));
  }
}
