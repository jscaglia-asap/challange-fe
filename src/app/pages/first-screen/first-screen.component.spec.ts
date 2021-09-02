import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseService } from 'src/app/components/base/services/base.service';

import { FirstScreenComponent } from './first-screen.component';

describe('FirstScreenComponent', () => {
  const scan = "apiserver:https://be-app-hiring-bixinf-test.apps.bi-x-ire.tftp.p1.openshiftapps.com/;user:admin;password:secret";

  let component: FirstScreenComponent;
  let fixture: ComponentFixture<FirstScreenComponent>;
  let baseService: BaseService;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstScreenComponent ],
      imports:[RouterTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      providers: [
        BaseService,
        MatSnackBar
      ]
    })
    .compileComponents();

    baseService = TestBed.inject(BaseService);

    fixture = TestBed.createComponent(FirstScreenComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('scanSuccessHandler function test', () => {
    it('Should recive a correct scan string and then save basic information and redirect', () => {
      component.scanSuccessHandler(scan);

      expect(baseService.getBaseUrl()).toEqual("https://be-app-hiring-bixinf-test.apps.bi-x-ire.tftp.p1.openshiftapps.com/api/v1.0/");
      expect(baseService.getIsLogged()).toBeTruthy();
      expect(baseService.getPassword()).toEqual("secret");
      expect(baseService.getUserName()).toEqual("admin");
    });

    it('Should recive a incorrect scan string and then dont do anything', () => {
      spyOn(snackBar, 'open');
      component.scanSuccessHandler("");

      expect(baseService.getBaseUrl()).toEqual("");
      expect(baseService.getIsLogged()).toBeFalsy();
      expect(baseService.getPassword()).toEqual("");
      expect(baseService.getUserName()).toEqual("");
      expect(snackBar.open).toHaveBeenCalled();
    });
  });
});
