import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { endpoints } from '../common/endpoint';
import { ApiserviceService } from '../service/apiservice.service';
import { HelperserviceService } from '../service/helperservice.service';


@Component({
  selector: 'app-paymentdetailpopup',
  templateUrl: './paymentdetailpopup.page.html',
  styleUrls: ['./paymentdetailpopup.page.scss'],
})
export class PaymentdetailpopupPage implements OnInit {

  card_number: any = '';
  exp_month: any = '';
  exp_year: any = '';
  cvv: any = '';
  first_name: any = '';
  last_name: any = '';





  constructor(private modalCtrl: ModalController,
    public helper: HelperserviceService,
    public api: ApiserviceService) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
  }

  Save_Card_Detail() {
    if (this.card_number == '' || this.card_number == null) {
      this.helper.presentToast("Please Enter Card Number");

    } else if (this.exp_month == '' || this.exp_month == null) {
      this.helper.presentToast("Please Enter Month");

    } else if (this.exp_year == '' || this.exp_year == null) {
      this.helper.presentToast("Please Enter Year");

    } else if (this.cvv == '' || this.cvv == null) {
      this.helper.presentToast("Please Enter CVV");

    } else if (this.first_name == '' || this.first_name == null) {
      this.helper.presentToast("Please Enter First Name");
    } else if (this.last_name == '' || this.last_name == null) {
      this.helper.presentToast("Please Enter Last Name");
    } else {
      this.helper.showLoading();
      this.api.post(endpoints.Save_Card(), {
        card_no: this.card_number,
        expiry_month: this.exp_month,
        expiry_yr: this.exp_year,
        cvv: this.cvv,
        first_name: this.first_name,
        last_name: this.last_name,
         will_remove: 1
      }).subscribe((resp: any) => {
        console.log(resp);
        if (resp.status == "Success") {
           this.card_number = "",
           this.exp_month = "",
           this.exp_year = "",
           this.cvv = "",
           this.first_name = "",
           this.last_name = "",
           this.helper.hideLoading();
           this.closeModal()
          this.helper.SuccessToast(resp.msg);

        } else {
          this.card_number = "",
          this.exp_month = "",
          this.exp_year = "",
          this.cvv = "",
          this.first_name = "",
          this.last_name = "",
          this.helper.hideLoading();
          this.closeModal();
        }

      }, error => {
        console.log(error);
        
        this.helper.hideLoading();
        this.helper.presentToast("something went wrong");
        this.closeModal();
      });
    }

  }

}
