import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-accounteditpopup',
  templateUrl: './accounteditpopup.page.html',
  styleUrls: ['./accounteditpopup.page.scss'],
})
export class AccounteditpopupPage implements OnInit {
  first_name: any = '';
  last_name: any = '';
  email: any = '';
  mobile_number = '';
  password: any = '';
  confirm_password: any = '';


  constructor(private modalCtrl: ModalController,
    public router: Router,
    public modalController: ModalController,
    public helper: HelperserviceService,
    public api: ApiserviceService,
    public nav: NavigationService) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
  }

  AccountEditInfo() {
    if (this.first_name == '' || this.first_name == null) {
      this.helper.presentToast('Please Enter First Name');
    } else if (this.last_name == '' || this.last_name == null) {
      this.helper.presentToast('Please Enter Last Name');
    } else if (this.email == '' || this.email == null) {
      this.helper.presentToast('Please Enter Email');
    } else if (this.mobile_number == '' || this.mobile_number == null) {
      this.helper.presentToast('Please Enter Mobile Number');
    } else if (this.password == '' || this.password == null) {
      this.helper.presentToast('Please Enter Password');
    } else if (this.confirm_password == '' || this.confirm_password == null) {
      this.helper.presentToast('Please Enter Confirm Password');
    } else if (this.password != this.confirm_password) {
      this.helper.presentToast('Password Mismatch');
    } else {
      this.helper.showLoading();
      this.api.post(endpoints.Account_Info_Edit(), {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        mobile_number: this.mobile_number,
        password: this.password,
        confirm_password: this.confirm_password
      }).subscribe((resp: any) => {
        console.log(resp);
        if (resp.status == "success") {
          this.helper.hideLoading();
          this.closeModal();
          this.helper.SuccessToast(resp.msg);
        } else {
          this.helper.hideLoading();
          this.closeModal();
          this.helper.presentToast(resp.msg);
        }
      }, error => {
        if (error) {
          this.helper.hideLoading();
          this.closeModal();
          this.helper.presentToast('something went to wrong');
        }
      });
    }
    
  }



}
