import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {

  data: any[] = [];

  constructor(
    private service : DataService, private router: Router) { 
    }

  ngOnInit() {
  }

  GetReviews(): any[]
  {
    this.data.length = 0;
    let array = this.service.GetReviews();

    for(var i = array.length - 10; i < array.length; i++)
    {
      if(i >= 0)
      {
        this.data.push(array[i]);
      }
    }

    return this.data;
  }

  LookUpReview(i: number)
  {
    this.router.navigateByUrl("/reviewData/" + this.data[i].urlID);
  }
}
