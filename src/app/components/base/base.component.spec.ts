import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { BaseComponent } from './base.component';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseComponent ],
      imports:[MatSnackBarModule],
      providers:[
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialize function test', () => {
    it('Should redirect when is logged', () => {
      expect(component.getIsLogged).toBeFalsy();
      component.setIsLogged = true;
      component.ngOnInit();
      expect (routerSpy.navigate).toHaveBeenCalledWith(['/second-screen']);
    });
  });


  describe('BaseUrl function test', () => {
    it('Should return string empty', () => {
      let result = component.getBaseUrl;
      expect(result).toEqual("");
    });

    it('Should return full string', () => {
      component.setBaseUrl = "testBaseUrl";
      let result = component.getBaseUrl;
      expect(result).toEqual("testBaseUrl");
    });
  });

  describe('IsLogged function test', () => {
    it('Should return false (is not logged)', () => {
      let result = component.getIsLogged;
      expect(result).toBeFalsy();
    });

    it('Should return true (is logged)', () => {
      component.setIsLogged = true;
      let result = component.getIsLogged;
      expect(result).toBeTruthy();
    });
  });

  describe('notInFirstScreen', () => {
    it('Should return true (is not in first-screen)', () => {
      expect(component.notInFirstScreen()).toBeTruthy();
    });
  });

});
