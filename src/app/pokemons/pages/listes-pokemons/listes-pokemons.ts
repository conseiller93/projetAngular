import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 🔹 ajout de ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listes-pokemons',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listes-pokemons.html',
  styleUrls: ['./listes-pokemons.css'],
})
export class ListesPokemons implements OnInit {
  pokemons: any[] = [];
  isLoading = true;

  // 🔹 injection de ChangeDetectorRef
  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('🟢 ngOnInit ListesPokemons');

    this.isLoading = true;

    this.http
      .get<any>('https://pokeapi.co/api/v2/pokemon?limit=200')
      .subscribe({
        next: (data) => {
          console.log('✅ Pokémon reçus');

          this.pokemons = data.results;
          this.isLoading = false;

          // 🔥 FORCER Angular à mettre à jour la vue
          this.cd.detectChanges();
        },
        error: () => {
          console.error('❌ Erreur API Pokémon');

          this.isLoading = false;
          this.cd.detectChanges();
        }
      });
  }

  getPokemonId(url: string): string {
    return url.split('/').filter(Boolean).pop()!;
  }
}




