import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddaddressPage } from '../addaddress/addaddress.page';
import { Router } from '@angular/router';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
import { PopoverController } from '@ionic/angular';
import { NewaddressComponent } from '../newaddress/newaddress.component';
declare var Razorpay;


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  Address: any = [];
  point = false;
  add1: any;
  Price: any = {};
  Paymentmethod: any = '';
  SelectAddress: any = '';
  Method = false;
  DeliveryMethod: any = 'delivery_at_address';

  constructor(public modalController: ModalController,
    public helper: HelperserviceService,
    public api: ApiserviceService,
    public router: Router,
    public nav: NavigationService,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.Get_Address();
    this.Price_Summary();
  }

  async menu(add_id) {
    const popover = await this.popoverController.create({
      component: NewaddressComponent,
      translucent: true,
      componentProps:
      {
        add: add_id,
      }
    });
    console.log("add_id", add_id);

    return await popover.present();
  }
  Check(event) {
    console.log(event);
    if (event.detail.value) {
      this.Method = true;
    } else {
      this.Method = false;
    }
    this.Delivery_charge();

  }
  radiochecked(event) {
    console.log(event);
    console.log(event.detail.value);
    if (event.detail.value) {
      this.point = true;
    } else {
      this.point = false;
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddaddressPage,
      cssClass: 'add-address-popup'
    });
    modal.onDidDismiss().then((data) => {
      console.log(data)
      this.Get_Address();
    });
    return await modal.present();

  }
  Get_Address() {
    this.helper.showLoading();
    this.api.get(endpoints.Get_Delivery_Address()).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == 'success') {
        this.Address = resp.data.delivery_address;
        this.helper.hideLoading();
      } else {
        this.helper.hideLoading();
      }

    }, error => {
      this.helper.hideLoading();
    });
  }
  Del_Add(del_id) {
    this.api.get(endpoints.Delete_address(del_id)).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == 'success') {
        this.Get_Address();
      } else {
        this.helper.hideLoading();
      }
    });
  }
  Price_Summary() {
    this.api.get(endpoints.Price_Detail()).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == "success") {
        this.Price = resp.data;
      }
    });
  }
  SelectPayment() {
    console.log(this.Paymentmethod);
  }
  PlaceOrder() {
    let base = this;
    if (base.DeliveryMethod == '') {
      base.helper.presentToast('please select Delivery Method')
    }
    else if (base.DeliveryMethod == 'delivery_at_address' && base.SelectAddress == '') {
      base.helper.presentToast('please select Address');
    }
    else if (base.Paymentmethod == '') {
      base.helper.presentToast('Please Select Payment Method');
    } else {
      if (base.Paymentmethod == 'COD') {
        base.helper.showLoading();
        base.api.post(endpoints.Place_Order(), {
          delivery_address_id: base.SelectAddress,
          payment_method: base.Paymentmethod,
          billing_address: base.SelectAddress,
          delivery_method: base.DeliveryMethod
        }).subscribe((resp: any) => {
          console.log(resp);
          if (resp.status == 'success') {
            base.helper.hideLoading();
            this.router.navigate(['/orderlist']);
            base.helper.SuccessToast(resp.msg);
            console.log(base.DeliveryMethod);
          } else {
            base.helper.hideLoading();
            base.helper.presentToast(resp.msg.delivery_address_id);
          }
        }, error => {
          if (error) {
            base.helper.hideLoading();
            base.helper.presentToast('Error placing order, Try Again Later');
          }
        });
      }
      else {
        var options: any = {
          currency: 'INR',
          key: this.Price.razorpay_key,
          amount: parseInt(this.Price.total) * 100,
          name: this.Price.shop_name,
          prefill: {
            email: this.Price.shop_email,
            contact: this.Price.shop_mobile,
            name: this.Price.shop_name
          },
          theme: {
            color: '#5DAE13'
          },
          modal: {
            ondismiss: function () {
              console.log('dismissed');

            }
          }
        };
        options.handler = ((response, error) => {
          console.log(response);
          console.log(response.razorpay_payment_id);
          console.log("option", options);
          base.helper.showLoading();
          base.api.post(endpoints.Place_Order(), {
            delivery_address_id: base.SelectAddress,
            payment_method: base.Paymentmethod,
            billing_address: base.SelectAddress,
            transaction: response.razorpay_payment_id.toString(),
            delivery_method: base.DeliveryMethod
          }).subscribe((resp: any) => {
            console.log(resp);
            if (resp.status == 'success') {
              base.helper.hideLoading();
              this.router.navigate(['/orderlist']);
              base.helper.SuccessToast(resp.msg);
              console.log(base.DeliveryMethod);
            } else {
              base.helper.hideLoading();
              base.helper.presentToast(resp.msg);
            }
          }, error => {
            if (error) {
              base.helper.hideLoading();
              base.helper.presentToast('Error Placing Order, Try Again Later');
            }
          });
          // call your backend api to verify payment signature & capture transaction
        });
        options.modal.ondismiss = (() => {
          // handle the case when user closes the form while transaction is in progress
          console.log('Transaction cancelled.');
        });
        Razorpay.open(options);
        console.log(options);

        // async presentAlert(response: string){
        //   // let responseObj = JSON.parse(response)
        //   console.log("message"+ response['razorpay_payment_id']);
        //   const alert = await this.alertController.create({
        //     message:response['razorpay_payment_id'],
        //     backdropDismiss: true,
        //   });

        //   await alert.present();
        // }
      }

    }


  }

  Delivery_charge() {
    this.api.get(endpoints.Exclude_Delivery_Charges(this.DeliveryMethod)).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == 'success') {
        this.Price = resp.data;
      }
    });
  }





}
