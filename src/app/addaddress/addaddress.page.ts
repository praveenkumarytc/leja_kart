import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiserviceService } from '../service/apiservice.service';
import { HelperserviceService } from '../service/helperservice.service';
import { endpoints } from '../common/endpoint';
import { Router } from '@angular/router';
import { NavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.page.html',
  styleUrls: ['./addaddress.page.scss'],
})
export class AddaddressPage implements OnInit {
  FullName: any = '';
  MobileNo: any = '';
  Landmark: any = '';
  RoadNo: any = '';
  City: any = '';
  House_no: any = '';
  State: any = '';
  Pincode: any = '';
  Area: any = '';
  Flat: any = '';


  constructor(private modalCtrl: ModalController, public api: ApiserviceService, public helper: HelperserviceService, public router: Router, public nav: NavigationService) { }

  ngOnInit() {

  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  Address() {

    if (this.FullName == '') {
      this.helper.presentToast('Please Enter FullName');
    }
    else if (this.MobileNo == '') {
      this.helper.presentToast('Please Enter Mobile_No');
    }
    else if (this.State == '') {
      this.helper.presentToast('Please Enter State');
    }
    else if (this.Pincode == '') {
      this.helper.presentToast('Please Enter Pincode');
    }
    else if (this.City == '') {
      this.helper.presentToast('Please Enter City');
    }
    else if (this.Area == '') {
      this.helper.presentToast('Please Enter Area');
    }
    else if (this.Flat == '') {
      this.helper.presentToast('Please Enter Flat');
    }
    else if (this.House_no == '') {
      this.helper.presentToast('Please Enter House_No ');
    }
    else if (this.Landmark == '') {
      this.helper.presentToast('Please Enter Landmark');
    }
    else {
      this.helper.showLoading();
      this.api.post(endpoints.Add_Address(), {
        full_name: this.FullName,
        mobile_no: this.MobileNo,
        pincode: this.Pincode,
        flat: this.Flat,
        area: this.Area,
        state: this.State,
        city: this.City,
        house_no: this.House_no,
        road_name: this.RoadNo,
        landmark: this.Landmark
      }).subscribe((resp: any) => {
        console.log(resp);
        if (resp.status == "success") {
          this.helper.hideLoading();
          this.helper.SuccessToast(resp.msg);
          this.closeModal();
        }
        else {
          this.helper.hideLoading();
          this.helper.presentToast(resp.msg);
          this.closeModal();
        }
      }, error => {
        if (error) {
          this.helper.hideLoading();
          this.helper.presentToast(error.message);
        }
      });
    }
  }

}
