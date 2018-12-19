import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = "";
  password: string = "";

  constructor(private service : DataService, private router: Router) { }

  ngOnInit() {
  }

Register()
{
   this.service.GetUsers(this)
}

IsValid(){
  return this.username.length > 5 && this.password.length > 5
}

RegisterReady(users: any[])
{
  console.log(users);
    let contains = false;

    for(var i = 0; i < users.length; i++)
    {
      if(users[i].username === this.username)
      {
          contains = true; 
          break;
        }
      }

      if(!contains)
      {
        this.service.RegisterUser(this.username, this.password);
        console.log("Register");
        this.router.navigateByUrl('/registerSucces');
      }
      
    } 

}
