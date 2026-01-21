import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router,RouterLink,RouterLinkActive,RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

  @Component({
    selector: 'app-navigation',
    standalone:true,
    imports: [RouterModule,CommonModule,RouterLink],
    templateUrl: './navigation.html',
  })
  export class Navigation {
    open = false;
    constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.open = false;
    });
  }
  logout(): void {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

  }
