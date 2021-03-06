import { Injectable } from '@angular/core';
import { timer } from "rxjs";
import { switchMap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { AuthService } from './auth-service.service';
import { Router } from '@angular/router';

interface User
{
  username: string,
  password:string
}

interface Reviewing
{
  url: string,
  urlID: string,
  title: string,
  auther: string,
  review: string,
  rating: number
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
  activeUser: string = "";

  constructor(private http : HttpClient, private auth : AuthService, private router : Router) 
  {
    timer(0, 1000)
    .pipe(switchMap(
      _ => this.http.get<Reviewing[]>(this.url_prefix+'/api/ReviewData'))
    ).subscribe(reviews => {
      console.log(reviews);
      this.reviews = reviews;
  })

    if (this.auth.IsLoggedIn()) 
    {
      this.activeUser = this.auth.GetLoginName();
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.auth.GetToken()}`
        })
      };
    }
  }

  PostReview(urlID: string, title: string, review: string, rating: number)
  {
    if(this.activeUser != ""){
      let reviewing: Reviewing = {url: urlID, urlID: urlID.replace(/\s/g, "q").replace(/[^a-zA-Z ]/g, "q") + this.reviews.length.toString(), title: title, review: review, rating: rating, auther: this.activeUser};

      this.http.post<Reviewing>(this.url_prefix+ '/api/PostReview', reviewing, this.httpOptions).subscribe(data => {
      });
    }
  }

  GetUsers(register) 
  {
    console.log('Getting users');

     this.http.get<User[]>(this.url_prefix+'/api/Users').subscribe(users => {
        this.users = users;
        console.log('Got users');
        register.RegisterReady(this.users);
    });
  }

  GetReviews(): Reviewing[]
  {
    return this.reviews;
  }

  Login(username: string, password: string)
  {
    let user: User = {username: username, password: password};

    this.http.post<any>(this.url_prefix+ '/api/authentication', user).subscribe(data => 
      {
        this.activeUser = user.username;
        this.auth.SetToken(data.token);
        this.auth.SetLoginName(this.activeUser);
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${this.auth.GetToken()}`
          })
        };

        this.router.navigateByUrl('/main');
      });
  }

  RegisterUser(username: string, password: string)
  {
    let user: User = {username: username, password: password};

    this.http.post<User>(this.url_prefix+'/api/Users', user).subscribe();
  }

  AccesReviewWriting()
  {
      return this.auth.IsLoggedIn();
  }

  Logout()
  {
    this.auth.Logout();
    this.activeUser = "";
    this.router.navigateByUrl('/main');
  }

  GetName(){
    return this.activeUser;
  }
}
