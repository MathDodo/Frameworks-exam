import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { ActivatedRoute, Router, Route } from "@angular/router";

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private service : DataService,) { 
    }

  ngOnInit() {
  }

  GoToReviewWriting()
  {
    this.router.navigateByUrl("/reviewData");
  }

  Login()
  {
    this.router.navigateByUrl("/login");
  }

  Register()
  {
    this.router.navigateByUrl("/register");
  }

}
