import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-reviews-page',
  templateUrl: './search-reviews-page.component.html',
  styleUrls: ['./search-reviews-page.component.css']
})
export class SearchReviewsPageComponent implements OnInit {

  searchUrl: string = "";

  constructor(private service: DataService, private router: Router) { }

  ngOnInit() {
  }

  GoToDetails()
  {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if(pattern.test(this.searchUrl))
    {
       let data = this.service.GetReviews();

       for(var i = 0; i < data.length; i++)
       {
          if(data[i].url ==  this.searchUrl)
          {
            this.router.navigateByUrl('/details/' + data[i].urlID.slice(0, data[i].urlID.length -1));
            break;
          }
       }
    }
  }

  HasReview()
  {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if(pattern.test(this.searchUrl))
    {
       let data = this.service.GetReviews();

       for(var i = 0; i < data.length; i++)
       {
          if(data[i].url ==  this.searchUrl)
          {
            return true;
          }
       }
    }
    return false;
  }

  IsValid()
  {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if(pattern.test(this.searchUrl))
    {
      return true;
    }

    return false;
  }
}
