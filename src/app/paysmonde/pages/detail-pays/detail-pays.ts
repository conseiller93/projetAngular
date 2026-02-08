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

  // 🔹 Wikipedia data bilingue
  currentLang: 'fr' | 'en' = 'fr';
  wikiData: any = {
    fr: { extract: '' },
    en: { extract: '' }
  };

  isLoadingCountry = true;
  isLoadingWeather = false;
  isLoading = true;

  countryFavorites: any[] = [];
  private readonly FAV_KEY = 'country_favs';

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
    this.loadFavorites();

    this.route.paramMap.subscribe(params => {
      const countryName = params.get('name');
      if (!countryName) return;

      this.isLoadingCountry = true;
      this.isLoading = true;
      this.resetData();

      this.countryService.getCountryByName(countryName).subscribe({
        next: (data) => {
          this.country = data[0];

          // Textes de base
          this.languagesText = this.country.languages
            ? Object.values(this.country.languages).join(', ')
            : 'N/A';

          this.currenciesText = this.country.currencies
            ? Object.values(this.country.currencies)
                .map((c: any) => `${c.name} (${c.symbol})`)
                .join(', ')
            : 'N/A';

          this.isLoadingCountry = false;

          // 🔹 Lancer le chargement Wikipedia dans les deux langues
          // On utilise 'translations.fra.common' pour le FR et 'name.common' pour l'EN
          const nameFR = this.country.translations?.fra?.common || this.country.name.common;
          const nameEN = this.country.name.common;
          this.loadAllWikiContent(nameFR, nameEN);

          if (this.country.latlng?.length === 2) {
            this.isLoadingWeather = true;
            this.loadWeather(this.country.latlng[0], this.country.latlng[1]);
          }
          this.cd.detectChanges();
        },
        error: () => {
          this.isLoadingCountry = false;
          this.isLoading = false;
          this.cd.detectChanges();
        }
      });
    });
  }

  private resetData() {
    this.country = null;
    this.weather = null;
    this.wikiData = { fr: { extract: '' }, en: { extract: '' } };
  }

  // --- LOGIQUE WIKIPEDIA BILINGUE ---

  private loadAllWikiContent(nameFR: string, nameEN: string) {
    this.isLoading = true;

    // Wikipedia Français
    const urlFR = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nameFR)}`;
    this.http.get<any>(urlFR).subscribe({
      next: (data) => {
        this.wikiData.fr.extract = data.extract || 'Résumé indisponible.';
        this.checkLoadingState();
      },
      error: () => {
        this.wikiData.fr.extract = 'Résumé indisponible en français.';
        this.checkLoadingState();
      }
    });

    // Wikipedia Anglais
    const urlEN = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nameEN)}`;
    this.http.get<any>(urlEN).subscribe({
      next: (data) => {
        this.wikiData.en.extract = data.extract || 'Summary unavailable.';
        this.checkLoadingState();
      },
      error: () => {
        this.wikiData.en.extract = 'Summary unavailable in English.';
        this.checkLoadingState();
      }
    });
  }

  private checkLoadingState() {
    // Si on a essayé de charger les deux, on arrête le spinner
    if (this.wikiData.fr.extract && this.wikiData.en.extract) {
      this.isLoading = false;
      this.cd.detectChanges();
    }
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'fr' ? 'en' : 'fr';
    this.cd.detectChanges();
  }

  // --- FAVORIS ---

  private loadFavorites() {
    const saved = localStorage.getItem(this.FAV_KEY);
    this.countryFavorites = saved ? JSON.parse(saved) : [];
  }

  isCountryFavorite(name: string): boolean {
    return this.countryFavorites.some(f => f.name === name);
  }

  toggleCountryFavorite(country: any) {
    const name = country.name.common;
    if (this.isCountryFavorite(name)) {
      this.countryFavorites = this.countryFavorites.filter(f => f.name !== name);
    } else {
      this.countryFavorites.push({
        name: name,
        flag: country.flags.png,
        capital: country.capital?.[0] || 'N/A',
        region: country.region
      });
    }
    localStorage.setItem(this.FAV_KEY, JSON.stringify(this.countryFavorites));
    this.cd.detectChanges();
  }

  // --- METEO ---

  loadWeather(lat: number, lon: number): void {
    this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${environment.weatherApiKey}`
    ).subscribe({
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