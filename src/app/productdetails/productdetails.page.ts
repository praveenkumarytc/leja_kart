import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {
  slidefirst = {
    initialSlide: 0,
    speed: 1400,
    slidesPerView: 1,
    spaceBetween: 8,
    slideShadows: true,
    autoplay: true,
  };
  Product_id: any = '';
  prod_details: any = [];
  // sliderimage:any=[];
  Pageload = true;
  Similar_Products: any = [];
  Review_Rating: object = {};

  constructor(public helper: HelperserviceService, public api: ApiserviceService, public router: Router, public nav: NavigationService) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.Product_id = this.router.getCurrentNavigation().extras.state.product_id;
      this.Productdetail();
    }
    console.log("product_id", this.Product_id);
    this.api.product_id = this.Product_id;
  }
  Productdetail() {
    this.helper.showLoading();
    this.api.get(endpoints.Prod_detail(this.Product_id)).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == "success") {
        this.prod_details = resp.data.products_details;
        this.Similar_Products = resp.data.similar_product;
        this.Review_Rating = resp.data;
        console.log("similar_product", this.Similar_Products);
        this.helper.hideLoading();
        this.Pageload = false;
      }
      else {
        this.helper.hideLoading();
      }
    },
      error => {
        this.helper.hideLoading();
      });
  }

  AddCart() {
    this.api.user_id = localStorage.getItem('User_Id');
    this.helper.showLoading();
    if (!this.api.user_id) {
      const navigationExtras: NavigationExtras = {
        state: {
          from: 'ProductdetailPage',
        }
      };
      this.nav.go('login', navigationExtras);
      this.helper.hideLoading();
    } else {

      this.api.post(endpoints.AddtoCart(), {
        product_id: this.Product_id
      }).subscribe((resp: any) => {

        console.log(resp);
        if (resp.status == 'success') {
          this.helper.hideLoading();
          this.helper.SuccessToast(resp.msg);
          this.Pageload = false;

        }
        else {
          this.helper.hideLoading();
          this.helper.presentToast(resp.msg);
        }
      },
        error => {
          if (error) {
            this.helper.hideLoading();
          }

        });
    }

  }
  go_detail(prodId) {
    this.api.user_id = localStorage.getItem('User_Id');
    if (this.api.user_id) {
      this.prod_details = prodId;
      this.helper.SuccessToast("Product updated");
    } else {
      this.router.navigate(['/login']);
    }

  }


}
