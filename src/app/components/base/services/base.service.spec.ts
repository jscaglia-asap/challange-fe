import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setBaseUrl function test', () => {
    it('Should set baseUrl', () => {
      expect(service.getBaseUrl()).toEqual("");
      service.setBaseUrl("baseUrlTest");
      expect(service.getBaseUrl()).toEqual("baseUrlTest");
    });
  });

  describe('setIsLogged function test', () => {
    it('Should set isLogged', () => {
      expect(service.getIsLogged()).toEqual(false);
      service.setIsLogged(true);
      expect(service.getIsLogged()).toEqual(true);
    });
  });

  describe('setUserName function test', () => {
    it('Should set userName', () => {
      expect(service.getUserName()).toEqual("");
      service.setUserName("userNameTest");
      expect(service.getUserName()).toEqual("userNameTest");
    });
  });

  describe('setPassword function test', () => {
    it('Should set password', () => {
      expect(service.getPassword()).toEqual("");
      service.setPassword("123456789");
      expect(service.getPassword()).toEqual("123456789");
    });
  });

  describe('setImageId function test', () => {
    it('Should set imageId', () => {
      expect(service.getImageId()).toEqual("");
      service.setImageId("123456789");
      expect(service.getImageId()).toEqual("123456789");
    });
  });

  describe('logOut function test', () => {
    it('Should logOut ok', () => {
      service.setBaseUrl("baseUrlTest");
      service.setIsLogged(true);

      expect(service.getBaseUrl()).toEqual("baseUrlTest");
      expect(service.getIsLogged()).toEqual(true);

      service.logOut();

      expect(service.getBaseUrl()).toEqual("");
      expect(service.getIsLogged()).toEqual(false);
    });
  });
});
