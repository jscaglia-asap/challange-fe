import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { BaseService } from 'src/app/components/base/services/base.service';
import { ShowImageService } from './services/show-image.service';
import { ShowImageComponent } from './show-image.component';

describe('ShowImageComponent', () => {
  let component: ShowImageComponent;
  let fixture: ComponentFixture<ShowImageComponent>;
  let baseService: BaseService;
  let showImageService: ShowImageService;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowImageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
      providers: [BaseService, ShowImageService, MatSnackBar]
    })
      .compileComponents();
  });

  beforeEach(() => {
    snackBar = TestBed.inject(MatSnackBar);
    showImageService = TestBed.inject(ShowImageService);
    baseService = TestBed.inject(BaseService);
    fixture = TestBed.createComponent(ShowImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logOutEmmiter function test', () => {
    it('Should logOut', () => {
      spyOn(baseService, 'logOut');

      component.logOut();
      expect(baseService.logOut).toHaveBeenCalled();
    });
  });


  describe('getImage function test', () => {
    it('Should get Image from server', () => {
      let blobImg = new Blob();
      spyOn(showImageService, 'getImage').and.returnValue(of(blobImg));
      spyOn(baseService, 'getImageId');
      spyOn(snackBar, 'open');

      component.ngOnInit();

      expect(baseService.getImageId).toHaveBeenCalled();
      expect(showImageService.getImage).toHaveBeenCalled();
      expect(snackBar.open).not.toHaveBeenCalled();

    });

    it('Should fail getImage service endpoint', () => {
      let blobImg = new Blob();
      spyOn(showImageService, 'getImage').and.returnValue(throwError({status: 404}));
      spyOn(baseService, 'getImageId');
      spyOn(snackBar, 'open');

      component.ngOnInit();

      expect(baseService.getImageId).toHaveBeenCalled();
      expect(showImageService.getImage).toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalled();
    });
  });
});
