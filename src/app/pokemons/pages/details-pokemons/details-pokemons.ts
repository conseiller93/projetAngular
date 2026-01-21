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
  stats: any[] = []; // <-- Nouveau tableau pour les stats

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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

        // 🔹 Préparer stats pour affichage en pourcentage
        // On prend la valeur / 255 (max stat possible) * 100
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
}





