import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  uiLog: string = "Login"
  username: string = "";

  constructor(
    private router : Router,
    private service : DataService) { 
    }

  ngOnInit() {
    if(this.service.activeUser != "")
    {
      this.username = this.service.GetName();
      this.uiLog = "Logout"
    }
  }

  GoToReviewWriting()
  {
    this.router.navigateByUrl("/reviewData");
  }

  IsLoggedIn()
  {
    if(this.service.activeUser != "")
    {
      this.uiLog = "Logout"
    }

    this.username = this.service.GetName();
    return this.uiLog != "Login"
  }

  GoToDetails()
  {
    this.router.navigateByUrl('/searchReview');
  }

  UiLog()
  {
    if(this.uiLog == "Login")
    {
      this.router.navigateByUrl("/login");
    }
    else
    {
      this.service.Logout();
      this.uiLog = "Login";
    }
  }

  Register()
  {
    this.router.navigateByUrl("/register");
  }
}
