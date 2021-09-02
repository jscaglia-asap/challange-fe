import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { BaseService } from 'src/app/components/base/services/base.service';
import { IFileRanking } from 'src/app/interfaces/IFileRanking';
import { IStatusResponse } from 'src/app/interfaces/IStatusResponse';
import { SecondScreenService } from './services/second-screen.service';

@Component({
  selector: 'app-second-screen',
  templateUrl: './second-screen.component.html',
  styleUrls: ['./second-screen.component.scss']
})
export class SecondScreenComponent extends BaseComponent implements OnInit {

  @Output() getPicture = new EventEmitter<WebcamImage>();
  public isCameraExist = true;
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public screenWidth: number = 0;
  public serverOk: boolean = false;

  constructor(
    private ssService: SecondScreenService,
    public snackBar: MatSnackBar,
    public router: Router,
    public baseService: BaseService) {
    super(baseService, router, snackBar);
    this.getScreenSize();
  }

  ngOnInit(): void {
    if (!this.baseService.getIsLogged()) {
      this.router.navigate(['']);
    } else {
      this.initWebCam();
    }
  }

  @HostListener('window:resize', ['$event'])
  public getScreenSize() {
    this.screenWidth = window.innerWidth / 2;
  }

  public checkServerEmmiter() {

    this.ssService.checkServer().subscribe((serverStatus: IStatusResponse) => {
      this.serverOk = true;
      this.snackBar.open("Server: " + serverStatus.status, undefined, {
        duration: 2000,
      });
    }, (error: Error) => {
      this.serverOk = false;
      this.snackBar.open("Server: " + error.message, undefined, {
        duration: 2000,
      });
    })
  }

  public takeUploadPhotoEmmiter() {
    this.trigger.next();
  }

  public logOutEmmiter() {
    this.baseService.logOut();
    this.router.navigate(['']);
  }

  public handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage) {
    this.getPicture.emit(webcamImage);

    this.ssService.checkServer().subscribe((serverStatus: IStatusResponse) => {
      if (serverStatus.status == "ok") {
        this.ssService.ranking(webcamImage.imageAsDataUrl).subscribe((fileRanking: IFileRanking) => {
          this.baseService.setImageId(fileRanking.file);
          this.router.navigate(['show-image']);
        }, (error: Error) => {
          this.snackBar.open(error.message, undefined, {
            duration: 5000,
          });
          console.error(error.message);
        })
      } else{
        this.snackBar.open("Server status it's not OK", undefined, {
          duration: 3000,
        });
      }
    }, (error: Error) => {
      this.serverOk = false;
      this.snackBar.open("Server: " + error.message, undefined, {
        duration: 5000,
      });
    });
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  private initWebCam(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      });
  }
}
