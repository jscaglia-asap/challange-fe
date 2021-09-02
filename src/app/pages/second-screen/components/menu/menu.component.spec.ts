import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('checkServer function test', () => {
    it('Should checkServer emmiter shoot', () => {
      spyOn(component.checkServerEmmiter, 'emit');

      component.checkServer();

      expect(component.checkServerEmmiter.emit).toHaveBeenCalled();
    });
  });

  describe('takeUploadPhoto function test', () => {
    it('Should takeUploadPhoto emmiter shoot', () => {
      spyOn(component.takeUploadPhotoEmmiter, 'emit');

      component.takeUploadPhoto();

      expect(component.takeUploadPhotoEmmiter.emit).toHaveBeenCalled();
    });
  });

  describe('logOut function test', () => {
    it('Should logOut emmiter shoot', () => {
      spyOn(component.logOutEmmiter, 'emit');

      component.logOut();

      expect(component.logOutEmmiter.emit).toHaveBeenCalled();
    });
  });
});
