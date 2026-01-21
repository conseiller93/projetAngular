import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Countryservice } from '../../countryservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-liste-pays',
  imports: [CommonModule, RouterLink],
  templateUrl: './liste-pays.html',
  styleUrls: ['./liste-pays.css'], // ✅ corrige styleUrl
})
export class ListePays implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = [];
  searchTerm: string = '';

  constructor(
    private countryService: Countryservice,
    private cd: ChangeDetectorRef // 🔹 injecté
  ) {}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(data => {
      this.countries = data;
      this.filteredCountries = []; // vide au départ
      this.cd.detectChanges(); // 🔹 forcer l'affichage après chargement
    });
  }

  // 🔹 Fonction pour encoder le nom du pays dans l'URL
  encodeName(name: string): string {
    return encodeURIComponent(name);
  }

  // 🔹 Recherche filtrée
  onSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredCountries = [];
      this.cd.detectChanges(); // 🔹 mettre à jour la vue
      return;
    }

    this.filteredCountries = this.countries.filter(c =>
      c.name?.common?.toLowerCase().includes(term)
    );

    this.cd.detectChanges(); // 🔹 forcer la mise à jour après filtre
  }
}



