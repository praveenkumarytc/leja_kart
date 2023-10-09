import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicRatingModule } from 'ionic-rating';
import { endpoints } from '../common/endpoint';
import { ApiserviceService } from '../service/apiservice.service';
import { HelperserviceService } from '../service/helperservice.service';

@Component({
  selector: 'app-rateproduct',
  templateUrl: './rateproduct.page.html',
  styleUrls: ['./rateproduct.page.scss'],
})
export class RateproductPage implements OnInit {
  rate: any;
  comment: any;
  Fetch_Review: any = [];


  constructor(
    public rating: IonicRatingModule,
    public api: ApiserviceService,
    public helper: HelperserviceService,
    public router: Router

  ) { }

  ngOnInit() {
    this.Fetch_Product_Review();
  }

  Product_Review() {

    this.helper.showLoading();
    this.api.post(endpoints.Product_Review(), {
      product_id: this.api.product_id,
      ratings: this.rate,
      review: this.comment

    }).subscribe((resp: any) => {
      console.log("resp", resp);
      if (resp.status == 'success') {
        this.rate = '';
        this.comment = '';
        this.Fetch_Product_Review();
        this.helper.SuccessToast(resp.msg);
        this.helper.hideLoading();
      } else {
        this.rate = '';
        this.comment = '';
        this.helper.presentToast(resp.msg);
        if (resp.msg?.ratings) {
          this.helper.presentToast(resp.msg.ratings[0]);
        } else if (resp.msg?.review) {
          this.helper.presentToast(resp.msg.review[0]);
        }
        this.helper.hideLoading();
      }


    }, error => {
      console.log(error);

      this.helper.hideLoading();
    });
  }

  onRatingChange(event) {
    console.log("Rating", event);

  }

  Fetch_Product_Review() {

    this.helper.showLoading();
    this.api.user_id = localStorage.getItem('User_Id');
    if (this.api.user_id) {
      this.api.get(endpoints.Fetch_prod__Review(this.api.product_id)).subscribe((resp: any) => {
        console.log(resp);
        if (resp.status == "success") {
          this.Fetch_Review = resp.data.reviews;

          this.helper.hideLoading();

        } else {
          this.helper.hideLoading();

        }
      },
        error => {
          console.log(error);
          this.helper.hideLoading();
          this.helper.presentToast("something went wrong");

        });
    } else {
      this.router.navigate(['/login']);
      this.helper.hideLoading();

    }

  }

}
