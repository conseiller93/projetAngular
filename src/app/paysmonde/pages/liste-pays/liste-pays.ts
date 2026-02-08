import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Countryservice } from '../../countryservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-pays',
  standalone: true, // Assure-toi que c'est bien présent si tu n'utilises pas de @NgModule
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './liste-pays.html',
  styleUrls: ['./liste-pays.css']
})
export class ListePays implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = [];
  searchTerm: string = '';
  
  // 🔹 Gestion des continents
  selectedRegion: string = 'All';
  regions: string[] = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(
    private countryService: Countryservice,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(data => {
      this.countries = data;
      // ✅ Correction : On affiche tous les pays au chargement initial
      this.filteredCountries = data; 
      this.cd.detectChanges();
    });
  }

  encodeName(name: string): string {
    return encodeURIComponent(name);
  }

  // 🔹 Filtrage par Continent
  filterByRegion(region: string): void {
    this.selectedRegion = region;
    this.applyFilters();
  }

  // 🔹 Recherche au clavier
  onSearch(): void {
    this.applyFilters();
  }

  // 🔹 Logique combinée (Continent + Recherche)
  private applyFilters(): void {
    let results = this.countries;

    // 1. Appliquer le filtre de région
    if (this.selectedRegion !== 'All') {
      results = results.filter(c => c.region === this.selectedRegion);
    }

    // 2. Appliquer la recherche textuelle
    const term = this.searchTerm.toLowerCase().trim();
    if (term) {
      results = results.filter(c =>
        c.name?.common?.toLowerCase().includes(term)
      );
    }

    this.filteredCountries = results;
    this.cd.detectChanges();
  }
}