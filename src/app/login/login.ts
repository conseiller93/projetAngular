import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'login',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  error: string = '';
  isLoading:boolean=false;

  constructor(private http: HttpClient, private router: Router) {}

login() {
  if (!this.email || !this.password) {
    this.error = 'Veuillez remplir tous les champs';
    return;
  }

  this.isLoading = true;
  this.error = '';

  setTimeout(() => {
    localStorage.setItem('token', 'fake-token');

    // 🔹 récupérer la page demandée
    const redirectUrl = localStorage.getItem('redirectUrl') || '/';
    localStorage.removeItem('redirectUrl');

    this.isLoading = false;
    this.router.navigateByUrl(redirectUrl);
  }, 1000);
}

}

