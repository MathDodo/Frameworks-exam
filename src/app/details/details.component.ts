import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  average: number = 0;
  url: string = '';
  data: any[] = [];
  dataSearch: string = '';
  constructor(private service: DataService, private router: Router) { }

  ngOnInit() {
    this.RealTimeUpdate();
  }

  RealTimeUpdate()
  {
    this.data.length = 0;
    this.average = 0;
    let splitted = this.router.url.toString().split('/');
    
    this.dataSearch = splitted[splitted.length -1];
    let serviceData = this.service.GetReviews();

    for(var i = 0; i < serviceData.length; i++)
    {
      if(serviceData[i].urlID.includes(this.dataSearch.slice(0, this.dataSearch.length -1)))
      {
        this.data.push(serviceData[i]);
      }
    }

    if(this.data.length > 0)
    {
      for(var i = 0; i < this.data.length; i++)
      {
        this.average += this.data[i].rating;
      }

      this.url = this.data[0].url;
      this.average /= this.data.length;
    }
  }

  SpecialReview()
  {
    this.router.navigateByUrl('special/'+ this.dataSearch);
  }

  GetData()
  {
    return this.data;
  }

  LookUpReview(i: number)
  {
    this.router.navigateByUrl("/reviewData/" + this.data[i].urlID);
  }
}
