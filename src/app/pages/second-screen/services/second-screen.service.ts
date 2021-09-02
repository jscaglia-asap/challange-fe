import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStatusResponse } from 'src/app/interfaces/IStatusResponse';
import { HttpHeaders } from '@angular/common/http';
import { IFileRanking } from 'src/app/interfaces/IFileRanking';
import { BaseService } from 'src/app/components/base/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class SecondScreenService {
  constructor(private http: HttpClient, private baseService: BaseService) {
  }

  /*
  Check if the backend is running
  */
  public checkServer(): Observable<IStatusResponse> {
    const baseUrl = this.baseService.getBaseUrl();
    return this.http.get<IStatusResponse>(baseUrl + "status");
  }

  /*
    Upload a png or jpeg image as base64 encoded string
  */
  public ranking(imgBase64: string): Observable<IFileRanking> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.baseService.getUserName() + ':' + this.baseService.getPassword())
      })
    };

    const baseUrl = this.baseService.getBaseUrl();
    return this.http.post<IFileRanking>(baseUrl + "ranking", { "picture": imgBase64 }, httpOptions);
  }
}
