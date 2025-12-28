import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Countryservice } from '../../countryservice'; 
import { CommonModule } from '@angular/common'; 
import {RouterLink} from "@angular/router"; 
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-liste-pays',
  imports: [CommonModule,RouterLink],
  templateUrl: './liste-pays.html',
  styleUrl: './liste-pays.css',
})
export class ListePays implements OnInit {

  countries: any[] = [];

  constructor(private countryService: Countryservice) {}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(data => {
      this.countries = data;
    });
  }
}
