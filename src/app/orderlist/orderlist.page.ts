import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.page.html',
  styleUrls: ['./orderlist.page.scss'],
})
export class OrderlistPage implements OnInit {
  Order: any = [];

  constructor(public modalController: ModalController,
    public helper: HelperserviceService,
    public api: ApiserviceService,
    public router: Router,
    public nav: NavigationService,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.Orderlist();
  }

  Orderlist() {

    this.api.user_id = localStorage.getItem('User_Id');
    this.helper.showLoading();
    if (this.api.user_id) {
      this.api.get(endpoints.Order_list()).subscribe((resp: any) => {
        console.log(resp);
        if (resp.status == 'success') {
          this.Order = resp.data.orders_list;
          this.helper.hideLoading();
          if (this?.Order?.length < 1) {
            this.helper.presentToast("your cart is empty");
          }
        } else {
          this.helper.hideLoading();
        }

      }, error => {
        if (error) {
          this.helper.hideLoading();
        }
      });
    } else {
      this.nav.go('/login');
      this.helper.hideLoading();
    }

  }
  Go_OrderDetail(ordId) {
    const navigationExtras: NavigationExtras = {
      state: {
        order_id: ordId,
      }
    };
    this.nav.go('/ordersdetails', navigationExtras);
    console.log("order_id", ordId);

  }


}
