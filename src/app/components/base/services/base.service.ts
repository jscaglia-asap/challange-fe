import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private _baseUrl$: string = "";
  private _userName$: string = "";
  private _password$: string = "";
  private _imageId$: string = "";
  private _isLogged$: boolean = false;

  constructor() {
    this.setBaseUrl("");
    this.setIsLogged(false);
  }

  public setBaseUrl(baseUrl: string) {
    this._baseUrl$ = baseUrl;
  }

  public getBaseUrl(): string {
    return this._baseUrl$;
  }

  public setIsLogged(idLogged: boolean) {
    this._isLogged$ = idLogged;
  }

  public getIsLogged(): boolean {
    return this._isLogged$;
  }


  public setUserName(userName: string) {
    this._userName$ = userName;
  }

  public getUserName(): string {
    return this._userName$;
  }


  public setPassword(password: string) {
    this._password$ = password;
  }

  public getPassword(): string {
    return this._password$;
  }

  public setImageId(imageId: string) {
    this._imageId$ = imageId;
  }

  public getImageId(): string {
    return this._imageId$;
  }

  public logOut() {
    this.setBaseUrl("");
    this.setIsLogged(false);
  }
}
