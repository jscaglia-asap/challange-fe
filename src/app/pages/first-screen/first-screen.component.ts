import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';
import { BaseService } from 'src/app/components/base/services/base.service';

@Component({
  selector: 'app-first-screen',
  templateUrl: './first-screen.component.html',
  styleUrls: ['./first-screen.component.scss']
})
export class FirstScreenComponent extends BaseComponent implements OnInit {
  public screenWidth: number = 0;
  public showHideScanQr: boolean = false;

  constructor(public baseService: BaseService, public router: Router, public snackBar: MatSnackBar) {
    super(baseService, router, snackBar);
    this.getScreenSize();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  public getScreenSize() {
    this.screenWidth = window.innerWidth / 2;
  }

  public scanSuccessHandler(scan: string): void {
    if (scan !== "") {
      //Corto el string porque se escanea con palabra clave "apiserver"
      const pathUrl = scan.substr(10, scan.length - 1);
      const authenticationValues: Array<string> = pathUrl.split(";");

      this.baseService.setBaseUrl(authenticationValues[0] + "api/v1.0/");
      this.baseService.setUserName(authenticationValues[1].split(":")[1]);
      this.baseService.setPassword(authenticationValues[2].split(":")[1]);
      this.baseService.setIsLogged(true);
      this.router.navigate(['/second-screen']);
    } else{
      this.snackBar.open("Error: Scan Incorrect!", undefined, {
        duration: 5000,
      });
    }
  }
}
