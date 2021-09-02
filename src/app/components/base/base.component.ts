import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseService } from './services/base.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  constructor(public baseService: BaseService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initialize();
  }

  public get getBaseUrl(): string {
    return this.baseService.getBaseUrl();
  }

  public set setBaseUrl(baseUrl: string) {
    this.baseService.setBaseUrl(baseUrl);
  }

  public get getIsLogged(): boolean {
    return this.baseService.getIsLogged();
  }

  public set setIsLogged(logged: boolean) {
    this.baseService.setIsLogged(logged);
  }

  public notInFirstScreen(): boolean {
    return this.router.url !== '/first-screen';
  }

  private initialize(): void {
    if (this.getIsLogged) {
      this.router.navigate(['/second-screen']);
    } else {
      this.router.navigate(['']);
    }
  }
}
