import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BaseService } from 'src/app/components/base/services/base.service';
import { IFileRanking } from 'src/app/interfaces/IFileRanking';
import { IStatusResponse } from 'src/app/interfaces/IStatusResponse';
import { SecondScreenService } from './second-screen.service';

describe('SecondScreenService', () => {
  let service: SecondScreenService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [{ provide: SecondScreenService }]
    });
    service = TestBed.inject(SecondScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkServer test', () => {
    it('Should excecute checkServer Ok', () => {
      jasmine.createSpy('SecondScreenService', service.checkServer).and.returnValue(of({ status: 'ok' }));
      service.checkServer().subscribe((result: IStatusResponse) => {
        expect(result).toEqual({ status: 'ok' });
      });
    });
  });

  describe('checkServer test', () => {
    it('Should excecute ranking Ok', () => {
      jasmine.createSpy('SecondScreenService', service.ranking).and.returnValue(of({ file: 'miFileId', status: 'ok' }));
      service.ranking("").subscribe((result: IFileRanking) => {
        expect(result).toEqual({ file: 'miFileId', status: 'jona' });
      });
    });
  });
});
