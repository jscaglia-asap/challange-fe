import { NgModule } from '@angular/core';
import { FirstScreenComponent } from './first-screen.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    ZXingScannerModule
  ],
  declarations: [
    FirstScreenComponent
  ]
})
export class FirstScreenModule { }
