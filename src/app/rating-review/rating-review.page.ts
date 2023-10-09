import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicRatingModule } from 'ionic-rating';
import { endpoints } from '../common/endpoint';
import { ApiserviceService } from '../service/apiservice.service';
import { HelperserviceService } from '../service/helperservice.service';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';


@Component({
  selector: 'app-rating-review',
  templateUrl: './rating-review.page.html',
  styleUrls: ['./rating-review.page.scss'],
})
export class RatingReviewPage implements OnInit {

  rate: any;
  comment: any;
  Fetch_Rating: any = [];

  constructor(public rating: IonicRatingModule,
    public api: ApiserviceService,
    public helper: HelperserviceService,
    public router: Router,
    public nav: NavigationService
  ) { }

  ngOnInit() {
    console.log("store_id", this.api.store_id);
    this.Fetch_store_Rating();

  }


  onRatingChange(event) {
    console.log(event);

  }

  Rating_Review() {

    this.helper.showLoading();
    this.api.post(endpoints.Rating_Review_save(), {
      store_id: this.api.store_id,
      ratings: this.rate,
      review: this.comment,

    }).subscribe((resp: any) => {

      console.log(resp);

      if (resp.status == "success") {
        this.rate = '';
        this.comment = '';
        this.Fetch_store_Rating();
        this.helper.SuccessToast(resp.msg);
        this.helper.hideLoading();
      }
      else {
        this.helper.hideLoading();
        this.rate = '';
        this.comment = '';
        this.helper.presentToast(resp.msg);
        if (resp.msg?.ratings) {
          this.helper.presentToast(resp.msg.ratings[0]);
        } else if (resp.msg?.review) {
          this.helper.presentToast(resp.msg.review[0]);
        }
      }
    }, error => {
      this.helper.hideLoading();
   });

  }

  Fetch_store_Rating() {
    this.helper.showLoading();
    this.api.user_id = localStorage.getItem('User_Id');
    if (this.api.user_id) {
      this.api.get(endpoints.Fetch_Rating(this.api.store_id)).subscribe((resp: any) => {
        console.log(resp);
        this.Fetch_Rating = resp.data.reviews;
        this.helper.hideLoading();

      },error=>{
        console.log(error);
        this.helper.presentToast("something went wrong");
        this.helper.hideLoading();

        
      });
    } else {
      this.router.navigate(['/login']);
      this.helper.hideLoading();
    }

  }

}
