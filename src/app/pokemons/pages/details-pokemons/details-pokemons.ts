
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details-pokemons',
  templateUrl: './details-pokemons.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class DetailsPokemons implements OnInit {
  pokemon: any;
  isLoading = true;
  errorMessage = '';

  typesText = '';
  abilitiesText = '';
  stats: any[] = [];
  
  // 🔹 Gestion des favoris
  favorites: any[] = [];
  private readonly FAV_KEY = 'poke_favs';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFavorites(); // Charger les favoris stockés
    
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.isLoading = true;

    this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe({
      next: (data: any) => {
        this.pokemon = data;

        this.typesText =
          data.types?.map((t: any) => t.type.name).join(', ') || 'N/A';

        this.abilitiesText =
          data.abilities?.map((a: any) => a.ability.name).join(', ') || 'N/A';

        // Préparer stats pour affichage en pourcentage
        this.stats = data.stats?.map((s: any) => ({
          name: s.stat.name,
          value: s.base_stat,
          percentage: Math.round((s.base_stat / 255) * 100),
        })) || [];

        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Impossible de charger le Pokémon.';
        this.cd.detectChanges();
      },
    });
  }

  // --- MÉTHODES FAVORIS ---

  private loadFavorites() {
    const saved = localStorage.getItem(this.FAV_KEY);
    this.favorites = saved ? JSON.parse(saved) : [];
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(fav => fav.id === id);
  }

  toggleFavorite(pokemon: any) {
    if (this.isFavorite(pokemon.id)) {
      // Retirer
      this.favorites = this.favorites.filter(fav => fav.id !== pokemon.id);
    } else {
      // Ajouter (on stocke le minimum d'infos nécessaires)
      this.favorites.push({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default
      });
    }
    // Sauvegarder dans le navigateur
    localStorage.setItem(this.FAV_KEY, JSON.stringify(this.favorites));
  }
}




