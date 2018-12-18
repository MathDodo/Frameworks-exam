import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  constructor(private service : DataService) { }

  ngOnInit() {
  }

  Login()
  {
    this.service.Login(this.username, this.password);
  }

}
