import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey: string = 'webworldtoken-jwt';
  userKey: string = 'webworldUser-jwt';

  constructor() { }

  SetLoginName(username: string)
  {
    localStorage.setItem(this.userKey, username);
  }

  SetToken(token: string) : void {
    localStorage.setItem(this.tokenKey, token)
  }

  GetLoginName()
  {
    return localStorage.getItem(this.userKey);
  }

  GetToken() : string {
    return localStorage.getItem(this.tokenKey);
  }

  IsLoggedIn() : boolean {
    return this.GetToken() !== null;
  }

  Logout() 
  {
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.tokenKey);
  }
}
