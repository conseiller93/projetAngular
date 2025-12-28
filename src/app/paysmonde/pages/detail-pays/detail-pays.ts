import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Countryservice } from '../../countryservice';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-detail-pays',
  imports: [CommonModule],
  templateUrl: './detail-pays.html',
  styleUrl: './detail-pays.css',
})
export class DetailPays implements OnInit {

  country: any;
  weather: any;
  languagesText = '';
  currenciesText = '';
  isLoadingCountry = true;
  isLoadingWeather = false;




  constructor(
    private route: ActivatedRoute,
    private countryService: Countryservice,
    private http: HttpClient,
    private location: Location
  ) {}
  isLoading = true;
  goBack(): void {
  this.location.back();
} 

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const countryName = params.get('name');
    if (!countryName) return;

    this.isLoadingCountry = true;
    this.country = null;
    this.weather = null;

    this.countryService.getCountryByName(countryName).subscribe({
      next: (data) => {
        this.country = data[0];

        // Langues
        this.languagesText = this.country.languages
          ? Object.values(this.country.languages).join(', ')
          : 'N/A';

        // Monnaies
        this.currenciesText = this.country.currencies
          ? Object.values(this.country.currencies)
              .map((c: any) => `${c.name} (${c.symbol})`)
              .join(', ')
          : 'N/A';

        this.isLoadingCountry = false;

        // Charger météo UNE SEULE FOIS
        if (this.country.latlng?.length === 2) {
          this.isLoadingWeather = true;
          this.loadWeather(
            this.country.latlng[0],
            this.country.latlng[1]
          );
        }
      },
      error: () => {
        this.isLoadingCountry = false;
      }
    });
  });
}

loadWeather(lat: number, lon: number): void {
  this.http.get<any>(
    `https://api.openweathermap.org/data/2.5/weather` +
    `?lat=${lat}&lon=${lon}&units=metric&lang=fr` +
    `&appid=${environment.weatherApiKey}`
  ).subscribe({
    next: (data) => {
      this.weather = data;
      this.isLoadingWeather = false;
    },
    error: () => {
      this.isLoadingWeather = false;
    }
  });
}

}
