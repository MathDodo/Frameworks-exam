import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-review-viewer',
  templateUrl: './review-viewer.component.html',
  styleUrls: ['./review-viewer.component.css']
})
export class ReviewViewerComponent implements OnInit {

  review : any = {title: 'Loading', auther: 'Loading', url: 'Loading', rating: 'Loading', review: 'Loading'};
  update: number = 10;

  constructor(private route: Router, private service: DataService) 
  {

  }

  ngOnInit() {
    this.update = 10;
  }

  RealTimeUpdate()
  {
    var array = this.service.GetReviews();
    let check = false;
    
    for(var item of array)
    {      
      if("/reviewData/" + item.urlID == this.route.url.toString())
      {
        check = true;
        this.review = item;
      }
    }

    if(!check && this.update == 0)
    {
      this.route.navigateByUrl("/pageNotFound");
    }

    this.update--;
  }
}
