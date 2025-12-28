import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Pokemonservice {
    private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=200';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  
}
