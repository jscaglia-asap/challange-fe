import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { WebcamImage, WebcamModule, WebcamUtil } from 'ngx-webcam';
import { Observable, of, throwError } from 'rxjs';
import { BaseService } from 'src/app/components/base/services/base.service';

import { SecondScreenComponent } from './second-screen.component';
import { SecondScreenService } from './services/second-screen.service';

describe('SecondScreenComponent', () => {
  let component: SecondScreenComponent;
  let ssService: SecondScreenService;
  let baseService: BaseService;
  let fixture: ComponentFixture<SecondScreenComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondScreenComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, RouterTestingModule, WebcamModule],
      providers: [
        SecondScreenService,
        BaseService,
        MatSnackBar,
        WebcamUtil
      ]
    })
      .compileComponents();

    ssService = TestBed.inject(SecondScreenService);
    baseService = TestBed.inject(BaseService);
    snackBar = TestBed.inject(MatSnackBar);
    fixture = TestBed.createComponent(SecondScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Init logged', () => {
    it('Should init the webcam', (done: DoneFn) => {

      // spyOn(WebcamUtil, 'getAvailableVideoInputs').and.callFake(() => Promise.resolve(Array<MediaDeviceInfo>()));

      spyOn(WebcamUtil, 'getAvailableVideoInputs').and.returnValue(Promise.resolve([]));
      baseService.setIsLogged(true);

      component.ngOnInit();

      expect(WebcamUtil.getAvailableVideoInputs).toHaveBeenCalled();
      expect(component.isCameraExist).toBeTruthy();
      done();
    });

  });


  describe('checkServerEmmiter function test', () => {
    it('Should Check server ok', () => {
      spyOn(ssService, 'checkServer').and.returnValue(of({ status: 'ok' }));
      spyOn(snackBar, 'open');

      component.checkServerEmmiter();
      expect(component.serverOk).toBeTruthy();
      expect(snackBar.open).toHaveBeenCalled();
    });

    it('Should Check server error', () => {
      spyOn(ssService, 'checkServer').and.returnValue(throwError({ status: 404 }));
      spyOn(snackBar, 'open');

      component.checkServerEmmiter();
      expect(component.serverOk).toBeFalsy();
      expect(snackBar.open).toHaveBeenCalled();
    });
  });

  describe('logOutEmmiter function test', () => {
    it('Should logOut', () => {
      spyOn(baseService, 'logOut');

      component.logOutEmmiter();
      expect(baseService.logOut).toHaveBeenCalled();
    });
  });

  describe('handleImage function test', () => {
    it('Should check server and call save picture', () => {
      const mockImageData = new ImageData(1, 1);
      const mockImge = new WebcamImage("", "", mockImageData);

      spyOn(component.getPicture, 'emit');
      spyOn(baseService, 'setImageId');
      spyOn(ssService, 'checkServer').and.returnValue(of({ status: 'ok' }));
      spyOn(ssService, 'ranking').and.returnValue(of({ file: 'miFile.png', status: 'ok' }));

      component.handleImage(mockImge);

      expect(component.getPicture.emit).toHaveBeenCalled();
      expect(ssService.checkServer).toHaveBeenCalled();
      expect(ssService.ranking).toHaveBeenCalled();
      expect(baseService.setImageId).toHaveBeenCalled();
    });

    it('Should fail checkServer', () => {
      const mockImageData = new ImageData(1, 1);
      const mockImge = new WebcamImage("", "", mockImageData);

      spyOn(component.getPicture, 'emit');
      spyOn(baseService, 'setImageId');
      spyOn(ssService, 'checkServer').and.returnValue(throwError({ status: 404 }));
      spyOn(ssService, 'ranking');
      spyOn(snackBar, 'open');

      component.handleImage(mockImge);

      expect(component.getPicture.emit).toHaveBeenCalled();
      expect(ssService.checkServer).toHaveBeenCalled();
      expect(ssService.ranking).not.toHaveBeenCalled();
      expect(baseService.setImageId).not.toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalled();
    });

    it('Should checkServer not fail but is not ok', () => {
      const mockImageData = new ImageData(1, 1);
      const mockImge = new WebcamImage("", "", mockImageData);

      spyOn(component.getPicture, 'emit');
      spyOn(baseService, 'setImageId');
      spyOn(ssService, 'checkServer').and.returnValue(of({ status: 'not ok' }));
      spyOn(ssService, 'ranking');
      spyOn(snackBar, 'open');

      component.handleImage(mockImge);

      expect(component.getPicture.emit).toHaveBeenCalled();
      expect(ssService.checkServer).toHaveBeenCalled();
      expect(ssService.ranking).not.toHaveBeenCalled();
      expect(baseService.setImageId).not.toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalled();
    });

    it('Should fail ranking', () => {
      const mockImageData = new ImageData(1, 1);
      const mockImge = new WebcamImage("", "", mockImageData);

      spyOn(component.getPicture, 'emit');
      spyOn(baseService, 'setImageId');
      spyOn(ssService, 'checkServer').and.returnValue(of({ status: 'ok' }));
      spyOn(ssService, 'ranking').and.returnValue(throwError({ status: 404 }));
      spyOn(snackBar, 'open');

      component.handleImage(mockImge);

      expect(component.getPicture.emit).toHaveBeenCalled();
      expect(ssService.checkServer).toHaveBeenCalled();
      expect(ssService.ranking).toHaveBeenCalled();
      expect(baseService.setImageId).not.toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalled();
    });
  });
});
