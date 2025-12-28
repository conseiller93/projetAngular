import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterLinkActive,RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

  @Component({
    selector: 'app-navigation',
    standalone:true,
    imports: [RouterModule,CommonModule,RouterLink],
    templateUrl: './navigation.html',
  })
  export class Navigation {
    open = false;

  }
