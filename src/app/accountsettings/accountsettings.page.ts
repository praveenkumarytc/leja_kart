import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccounteditpopupPage } from '../accounteditpopup/accounteditpopup.page';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
import { AddaddressPage } from '../addaddress/addaddress.page';

@Component({
  selector: 'app-accountsettings',
  templateUrl: './accountsettings.page.html',
  styleUrls: ['./accountsettings.page.scss'],
})
export class AccountsettingsPage implements OnInit {
  AccountDetail: any = {};
  Address: any = [];
  point = false;

  constructor(public router: Router,
    public modalController: ModalController,
    public helper: HelperserviceService,
    public api: ApiserviceService,
    public nav: NavigationService,) { }

  ngOnInit() {
    this.AccountInfo();
     this.Get_Address();
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
      component: AccounteditpopupPage,
      cssClass: 'account-edit-modal',
      backdropDismiss: true,
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.AccountInfo();
    });
    return await modal.present();
  }

  AccountInfo() {
    this.helper.showLoading();
    this.api.get(endpoints.Account_Info()).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == "success") {
        this.AccountDetail = resp.data;
        this.helper.hideLoading();
      } else {
        this.helper.hideLoading();
      }

    }, error => {
      if (error) {
        this.helper.hideLoading();
      }
    });

  }

  async Add_Address() {
    const modal = await this.modalController.create({
      component: AddaddressPage,
      cssClass: 'add-address-popup'
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.Get_Address();
    });
    return await modal.present();
  }
 
  Get_Address() {
    // this.helper.showLoading();
    this.api.get(endpoints.Get_Delivery_Address()).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == 'success') {
        this.Address = resp.data.delivery_address;
        this.helper.hideLoading();
      } else {
        this.helper.hideLoading();
      }

    }, error => {
      console.log("error",error); 
      this.helper.hideLoading();
    });
  }
  Del_Add(del_id) {
    this.helper.showLoading();
    this.api.get(endpoints.Delete_address(del_id)).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == 'success') {
        this.Get_Address();
        this.helper.presentToast(resp.msg);
        this.helper.hideLoading();
      } else {
        this.helper.hideLoading();
        this.helper.presentToast(resp.msg);
      }
    },error=>{
      console.log("error",error);
      this.helper.hideLoading();
    });
  }
}
