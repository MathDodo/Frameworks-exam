import { Injectable } from '@angular/core';
import { timer } from "rxjs";
import { switchMap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { AuthService } from './auth-service.service';

interface User
{
  username: string,
  password:string
}

interface Reviewing
{
  urlID: string,
  title: string,
  auther: string,
  review: string,
  score: number
}

@Injectable({
  providedIn: 'root'
})
export class DataService 
{
  private url_prefix : string = environment.express_url;
  private httpOptions = {};
  
  reviews : Reviewing[] = [];
  users: User[] = [];
  constructor(private http : HttpClient, private auth : AuthService) 
  {
    if (this.auth.IsLoggedIn()) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.auth.GetToken()}`
        })
      };
    }
    console.log("Starting poller.");
    timer(0, 1000)
      .pipe(switchMap(
        _ => this.http.get<Reviewing[]>(this.url_prefix+'/api/ReviewData'))
      ).subscribe(reviews => {
        this.reviews = reviews;
    })
  }

  GetData(theId: string) 
  {
    return this.reviews.find(d => d.urlID == theId);
  }

  GetUsers(register) 
  {
     this.http.get<User[]>(this.url_prefix+'/api/Users').subscribe(users => {
        this.users = users;

        register.RegisterReady(this.users);
    });
  }

  Login(username: string, password: string)
  {
    let user: User = {username: username, password: password};
    this.http.post<any>(this.url_prefix+ '/api/authentication', user).subscribe(data => 
      {
        this.auth.SetToken(data.token);

        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${this.auth.GetToken()}`
          })
        };
      });
  }

  RegisterUser(username: string, password: string)
  {
    let user: User = {username: username, password: password};

    this.http.post<User>(this.url_prefix+'/api/Users', user).subscribe();
  }

  AccesReviewWriting()
  {
    this.http.get<Reviewing[]>(this.url_prefix+'/api/PostReview', this.httpOptions).subscribe(reviews => {
      this.reviews = reviews;
  });
  }
}
