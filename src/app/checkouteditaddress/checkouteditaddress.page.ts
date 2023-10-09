import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddaddressPage } from '../addaddress/addaddress.page';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-checkouteditaddress',
  templateUrl: './checkouteditaddress.page.html',
  styleUrls: ['./checkouteditaddress.page.scss'],
})
export class CheckouteditaddressPage implements OnInit {
  add_id: number;
  fullname: string;
  mobile_no:string;
  pincode: string;
  flat: string;
  house_no: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  Address:any='';
  @ViewChild('popover') popover;


  constructor(public modalController: ModalController, public helper: HelperserviceService, public api: ApiserviceService, public router: Router, public nav: NavigationService, private popoverController: PopoverController) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.add_id = this.router.getCurrentNavigation().extras.state.add_id;
    }
    console.log("addid", this.add_id);
  }

  isOpen = false;

  ngOnInit() { }

  Edit_Address() {
    if (this.fullname == '' || this.fullname == null) {
      this.helper.presentToast('Please Enter Fullname')
    } else if (this.mobile_no == '' || this.mobile_no == null) {
      this.helper.presentToast('Please Enter Mobile No')
    } else if (this.state == '' || this.state == null) {
      this.helper.presentToast('Please Enter state')
    } else if (this.pincode == '' || this.pincode == '') {
      this.helper.presentToast('Please Enter Pincode')
    } else if (this.city == '' || this.city == null) {
      this.helper.presentToast('Please Enter City')
    } else if (this.area == '' || this.area == null) {
      this.helper.presentToast('Please Enter Area')
    } else if (this.flat == '' || this.flat == null) {
      this.helper.presentToast('Please Enter Flat')
    } else if (this.house_no == '' || this.house_no == null) {
      this.helper.presentToast('Please Enter House_No')
    } else if (this.landmark == '' || this.landmark == null) {
      this.helper.presentToast('Please Enter Landmark')
    } else {
      this.helper.showLoading();
      this.Address= {
        full_name: this.fullname,
        mobile_no: this.mobile_no,
        pincode: this.pincode,
        flat: this.flat,
        house_no: this.house_no,
        area: this.area,
        landmark: this.landmark,
        city: this.city,
        state: this.state
      }

      this.api.post(endpoints.Edit_Delivery_Address(this.add_id),this.Address).subscribe((resp: any) => {
        console.log(resp);
        if (resp.status == 'success'){
           this.fullname = '',
          this.mobile_no ='',
           this.pincode = '',
           this.flat= '',
           this.house_no= '',
           this.area='',
           this.landmark='',
          this.city='',
           this.state='';
         this.helper.hideLoading();
         this.helper.presentToast(resp.msg);
         this.nav.go('checkout');
        }

      });
    }



  }
  // presentPopover(e: Event) {
  //   this.popoverController.dismiss
  //   this.isOpen = true;
  // }

}
