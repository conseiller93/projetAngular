import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Navigation } from './components/navbar/navigation';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Footer } from './components/footer/footer';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    Navigation,
    HttpClientModule,
    Footer,
    FormsModule
  ],
  exports: [Navigation,Footer]
})
export class coremoduleModule {}
