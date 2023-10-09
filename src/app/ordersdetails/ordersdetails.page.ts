import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
import { PopoverController } from '@ionic/angular';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-ordersdetails',
  templateUrl: './ordersdetails.page.html',
  styleUrls: ['./ordersdetails.page.scss'],
})
export class OrdersdetailsPage implements OnInit {
  order_id: any = '';
  OrderDetail: any = {};
  Orders: any = {};
  Products: any = {};
  OrderImage: any = [];
  Delivery_Address: any = [];

  constructor(public modalController: ModalController,
    public helper: HelperserviceService,
    public api: ApiserviceService,
    public router: Router,
    public nav: NavigationService,
    private popoverController: PopoverController) {
  }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.order_id = this.router.getCurrentNavigation().extras.state.order_id;
      this.OrderDetails();
    }
    console.log("order_id", this.order_id);
  }

  OrderDetails() {
    this.helper.showLoading();
    this.api.get(endpoints.Order_details(this.order_id)).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == 'success') {
        this.OrderDetail = resp.data.orders_details;
        this.Orders = resp.data.orders_details.orders;
        this.Products = resp.data.orders_details.product;
        this.OrderImage = resp.data.orders_details.image_array;
        this.Delivery_Address = resp.data.orders_details.delivery_address;
        this.helper.hideLoading();
      }
      else {
        this.helper.hideLoading();
      }

    }, error => {
      if (error) {
        this.helper.hideLoading();

      }
    });
  }

  CancelOrder() {
    this.helper.showLoading();
    this.api.post(endpoints.Cancel_Order(), {
      orderID: this.OrderDetail.id,
      master_order_id: this.OrderDetail.order_id,
      gst_with_product_price: this.OrderDetail.price,
      total_amnt: this.OrderDetail.total_price
    }).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == 'success') {
        this.OrderDetails();
        this.helper.hideLoading();
        this.helper.presentToast(resp.msg);

      } else {
        this.helper.hideLoading();
        this.helper.presentToast(resp.msg);
      }

    }, error => {
      if (error) {
        this.helper.hideLoading();
      }
    });
  }

}
