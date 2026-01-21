import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {
  currentDate: string = '';
  location: string = 'Localisation inconnue';

  contacts = {
    email: 'mddiallo154@gmail.com',
    phone: '+224 626 94 53 16',
    linkedin: 'https://www.linkedin.com/in/tonprofil'
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // 🔹 Date du jour
    const now = new Date();
    this.currentDate = now.toLocaleDateString('fr-FR', { 
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
    });

    // 🔹 Localisation actuelle (pays)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // API OpenStreetMap Nominatim pour obtenir le pays
          this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .subscribe({
              next: (data) => {
                this.location = data.address?.country || 'Pays inconnu';
              },
              error: () => {
                this.location = 'Pays inconnu';
              }
            });

        },
        (error) => {
          console.warn('Localisation non disponible', error);
        }
      );
    }
  }
}




