import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondScreenComponent } from './second-screen.component';
import { MenuComponent } from './components/menu/menu.component';
import { SecondScreenService } from './services/second-screen.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from 'src/app/app-routing.component';



@NgModule({
  declarations: [
    SecondScreenComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    WebcamModule,
    AppRoutingModule
  ],
  providers:[
    SecondScreenService
  ]
})
export class SecondScreenModule { }
