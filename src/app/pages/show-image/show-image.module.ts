import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowImageComponent } from './show-image.component';
import { ShowImageService } from './services/show-image.service';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ShowImageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  providers:[
    ShowImageService
  ]
})
export class ShowImageModule { }
