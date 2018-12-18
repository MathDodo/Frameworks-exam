import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {

  title: string = "";
  url: string = "";
  review: string = "";
  rating: number = 3;

  constructor(private service : DataService, private router: Router) { }

  ngOnInit() {
    
    if(!this.service.AccesReviewWriting())
    {
      this.router.navigateByUrl('/login');
    }
  }

  PostReview()
  {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if(this.title != "" && this.review != "" && pattern.test(this.url))
    {
      console.log('Posting');
      this.service.PostReview(this.url, this.title, this.review, this.rating);
    }
  }
}
