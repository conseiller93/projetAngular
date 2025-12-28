import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Countryservice {

   private baseUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  // 🔹 Liste des pays (Home)
  getAllCountries(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/all?fields=name,capital,region,population,flags`
    );
  }

  // 🔹 Détail d’un pays (DetailPays)
getCountryByName(name: string): Observable<any[]> {
  return this.http.get<any[]>(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
    
  );
}

}
