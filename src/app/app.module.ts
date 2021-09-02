import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.component';

import { AppComponent } from './app.component';
import { BaseComponent } from './components/base/base.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FirstScreenModule } from './pages/first-screen/first-screen.module';
import { HttpClientModule } from '@angular/common/http';
import { SecondScreenModule } from './pages/second-screen/second-screen.module';
import { ShowImageModule } from './pages/show-image/show-image.module';
import { BaseService } from './components/base/services/base.service';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,

    // Mis Modulos
    FirstScreenModule,
    SecondScreenModule,
    ShowImageModule
  ],
  providers: [
    BaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
