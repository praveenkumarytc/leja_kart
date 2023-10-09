import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
import { InterceptorService } from '../service/interceptor.service'; 


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  qty = 1;
  allCart: any = [];
  pageload = true;
  store_price:any;
  store_name:any={};

  constructor(public helper: HelperserviceService, 
    public api: ApiserviceService,
     public router: Router, 
     public nav: NavigationService,
     public interceptor:InterceptorService,
     ) { }

  ionViewWillEnter() {
     this.helper.showLoading();
    this.Getcart();
    }

  ngOnInit() {
  }

  Getcart(){
    this.api.user_id= localStorage.getItem('User_Id');
    console.log(this.api.user_id);
    if (this.api.user_id) {
      this.api.get(endpoints.GetCart()).subscribe((resp: any) => {
        console.log(resp);
        if (resp.status == 'success') {
          this.helper.hideLoading();
          if(resp.msg == 'Cart is Empty'){
            this.allCart = [];
            this.helper.presentToast(resp.msg);
          }
          else{
            this.allCart = resp.data.all_cart;
            this.store_price= resp.data.price;
            this.store_name = resp.data.store_name;

            this.helper.hideLoading();
            this.pageload = false;
          }
        } else {
          this.helper.hideLoading();         
        }
      },error =>{
        this.helper.hideLoading();
      });
    }
    else{
      this.nav.go('login');
      this.helper.hideLoading();
    }

  }
  IncreaseQty(item, index) {
    console.log(item)
    console.log(index);

    if (item.quantity < 10) {
      this.helper.showLoading();
      var newquantity = +item.quantity + 1
      console.log(newquantity)

      this.api.post(endpoints.UpdateCart(), {
        cart_id: item.id,
        quantity: newquantity
      }).subscribe((resp: any) => {
        console.log(resp);
        if (resp.status == 'success') {
          this.Getcart();
        }else{
          this.helper.hideLoading();
          this.helper.presentToast(resp.msg);
        }
      });
    }
  }
  DecreaseQty(item) {
    console.log(item)
    if (item.quantity > 1) {
      this.helper.showLoading();
      var newquantity = +item.quantity - 1
      console.log(newquantity)

      this.api.post(endpoints.UpdateCart(), {
        cart_id: item.id,
        quantity: newquantity
      }).subscribe((resp: any) => {
        console.log(resp);
        if (resp.status == 'success') {
          this.Getcart();
        }
        else{
          this.helper.hideLoading();
          this.helper.presentToast(resp.msg);
        }
      });
    }
  }

  DeleteCart(item) {
    console.log(item);
    this.helper.showLoading();
    this.api.get(endpoints.Delcart(item)).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == 'success') {
        this.Getcart();
      }else{
        this.helper.hideLoading();
      }
    },error =>{
      this.helper.hideLoading();
    });
  }
  goCheckout() {
    if (this.api.user_id) {
      const navigationExtras: NavigationExtras = {
        state: {
          from: 'cartPage',
        }
      };
      this.nav.go('checkout', navigationExtras);
    } else {

      this.nav.go('login');
    }
  }

}
