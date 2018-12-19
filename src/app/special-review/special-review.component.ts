import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-review',
  templateUrl: './special-review.component.html',
  styleUrls: ['./special-review.component.css']
})
export class SpecialReviewComponent implements OnInit {

  title: string = "";
  url: string = "";
  review: string = "";
  rating: number = 3;

  constructor(private service : DataService, private router: Router) { }

  ngOnInit() {
    
    let holder = this.router.url.toString().split('/');
    let varify = holder[holder.length -1];
    let varification = false;
    let data = this.service.GetReviews();

    for(var i = 0; i < data.length; i++)
    {
      if(data[i].urlID.includes(varify))
      {
        varification = true;
        this.url = data[i].url;
        break;
      }
    }

    if(!varification)
    {
      this.router.navigateByUrl('/main');
    }

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
      this.service.PostReview(this.url , this.title, this.review, this.rating);
    }

    this.router.navigateByUrl('/main');
  }
}
