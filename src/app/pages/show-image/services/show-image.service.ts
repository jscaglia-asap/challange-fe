import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/components/base/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ShowImageService {
  private baseUrl: string = "";

  constructor(private http: HttpClient, private baseService: BaseService) {
    this.baseUrl = this.baseService.getBaseUrl();
   }

  /*
    Get an image
  */
  public getImage(imageId: string): Observable<any>{
    return this.http.get<any>(this.baseUrl + "image/" + imageId, { responseType: 'blob' as 'json' });
  }

}
