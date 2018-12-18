import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = "";
  password: string = "";

  constructor(private service : DataService) { }

  ngOnInit() {
  }

Register()
{
   this.service.GetUsers(this)
}

RegisterReady(users: any[])
{
  let contains = false;

  console.log(users.length);

  for(var i = 0; i < users.length; i++)
  {
    if(users[i].username === this.username)
    {
      contains = true; 
      break;
    }
  }

  console.log(this.username.length);
  console.log(this.password.length)

  if(this.username.length > 5 && !contains && this.password.length > 5)
  {
    this.service.RegisterUser(this.username, this.password);
    console.log("Register");
  }
}

}
