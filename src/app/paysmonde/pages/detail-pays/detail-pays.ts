import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Countryservice } from '../../countryservice';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-detail-pays',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-pays.html',
})
export class DetailPays implements OnInit {
  country: any;
  weather: any;
  languagesText = '';
  currenciesText = '';

  // Wikipedia data
  wikiExtract: string = '';
  wikiImage: string = '';
  wikiPersonalities: string = '';
  wikiEconomy: string = '';

  isLoadingCountry = true;
  isLoadingWeather = false;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private countryService: Countryservice,
    private http: HttpClient,
    private location: Location,
    private cd: ChangeDetectorRef
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const countryName = params.get('name');
      if (!countryName) return;

      this.isLoadingCountry = true;
      this.isLoading = true;
      this.country = null;
      this.weather = null;
      this.wikiExtract = '';
      this.wikiImage = '';
      this.wikiPersonalities = '';
      this.wikiEconomy = '';

      // 🔹 Info pays
      this.countryService.getCountryByName(countryName).subscribe({
        next: (data) => {
          this.country = data[0];

          this.languagesText = this.country.languages
            ? Object.values(this.country.languages).join(', ')
            : 'N/A';

          this.currenciesText = this.country.currencies
            ? Object.values(this.country.currencies)
                .map((c: any) => `${c.name} (${c.symbol})`)
                .join(', ')
            : 'N/A';

          this.isLoadingCountry = false;
          this.isLoading = false;
          this.cd.detectChanges();

          // 🔹 Wikipedia info
          this.loadWikipedia(this.country.name.common);

          if (this.country.latlng?.length === 2) {
            this.isLoadingWeather = true;
            this.loadWeather(this.country.latlng[0], this.country.latlng[1]);
          }
        },
        error: () => {
          this.isLoadingCountry = false;
          this.isLoading = false;
          this.cd.detectChanges();
        }
      });
    });
  }

loadWikipedia(countryName: string): void {
  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(countryName)}`;

  this.http.get<any>(apiUrl).subscribe({
    next: (data) => {
      // Texte résumé principal
      this.wikiExtract = data.extract || 'Résumé indisponible.';

      // Image
      this.wikiImage = data.thumbnail?.source || '';

      // Personnalités célèbres (approximation : cherche mots-clés dans extract)
      const lower = this.wikiExtract.toLowerCase();
      if (lower.includes('people') || lower.includes('famous') || lower.includes('personality')) {
        this.wikiPersonalities = this.wikiExtract;
      } else {
        this.wikiPersonalities = 'Informations sur les personnalités célèbres indisponibles.';
      }

      // Économie (approximation)
      if (lower.includes('economy') || lower.includes('gdp') || lower.includes('industries')) {
        this.wikiEconomy = this.wikiExtract;
      } else {
        this.wikiEconomy = 'Informations économiques indisponibles.';
      }

      this.cd.detectChanges();
    },
    error: () => {
      console.warn('Wikipedia info indisponible');
      this.wikiExtract = 'Résumé indisponible.';
      this.wikiPersonalities = 'Informations sur les personnalités célèbres indisponibles.';
      this.wikiEconomy = 'Informations économiques indisponibles.';
      this.cd.detectChanges();
    }
  });
}

// Carte OpenStreetMap plus petite
getOSMMapUrl(): string {
  if (!this.country?.latlng) return '';
  const lat = this.country.latlng[0];
  const lon = this.country.latlng[1];
  const zoom = 4;
  const width = 500;  // réduit la largeur
  const height = 200; // réduit la hauteur
  return `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&z=${zoom}&size=${width},${height}&l=map&pt=${lon},${lat},pm2rdm`;
}




  loadWeather(lat: number, lon: number): void {
    this.http
      .get<any>(
        
        `https://api.openweathermap.org/data/2.5/weather` +
          `?lat=${lat}&lon=${lon}&units=metric&lang=fr` +
          `&appid=${environment.weatherApiKey}`
      )
      .subscribe({
        next: (data) => {
          this.weather = data;
          this.isLoadingWeather = false;
          this.cd.detectChanges();
        },
        error: () => {
          this.isLoadingWeather = false;
          this.cd.detectChanges();
        }
      });
  }
}







