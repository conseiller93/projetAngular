import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);

  currentDate: string = '';
  location: string = 'Recherche en cours...';

  contacts = {
    email: 'mddiallo154@gmail.com',
    phone: '+224 626 94 53 16',
    linkedin: 'https://www.linkedin.com/in/tonprofil'
  };

  ngOnInit(): void {
    // 1. Date (Fonctionne partout)
    this.currentDate = new Date().toLocaleDateString('fr-FR', { 
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
    });

    // 2. Géolocalisation (Uniquement sur le navigateur)
    if (isPlatformBrowser(this.platformId)) {
      this.getUserLocation();
    } else {
      this.location = 'Serveur (localisation indisponible)';
    }
  }

  getUserLocation() {
  // On utilise une API gratuite qui devine le lieu via l'adresse IP
  // Pas besoin de permission navigator.geolocation !
  this.http.get<any>('https://ipapi.co/json/').subscribe({
    next: (data) => {
      // data contient city, country_name, etc.
      this.location = `${data.city}, ${data.country_name}`;
    },
    error: (err) => {
      console.error('Erreur IP API', err);
      this.location = 'Localisation indisponible';
    }
  });
}
}




