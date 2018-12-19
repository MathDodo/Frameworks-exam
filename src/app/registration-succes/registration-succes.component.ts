import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-registration-succes',
  templateUrl: './registration-succes.component.html',
  styleUrls: ['./registration-succes.component.css']
})
export class RegistrationSuccesComponent implements OnInit {
  username: string = "";
  password: string = "";

  constructor(private service : DataService,
    ) { }

  ngOnInit() {
  }

  Login()
  {
    this.service.Login(this.username, this.password);
  }

}
