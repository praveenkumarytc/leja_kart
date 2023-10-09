import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { endpoints } from '../common/endpoint';
import { PaymentdetailpopupPage } from '../paymentdetailpopup/paymentdetailpopup.page';
import { ApiserviceService } from '../service/apiservice.service';
import { HelperserviceService } from '../service/helperservice.service';

@Component({
  selector: 'app-paymentdetail',
  templateUrl: './paymentdetail.page.html',
  styleUrls: ['./paymentdetail.page.scss'],
})
export class PaymentdetailPage implements OnInit {
  Card_Detail:any=[];

  constructor(
    public modalController: ModalController,
    public api: ApiserviceService,
    public helper: HelperserviceService
  ) { 
    this.Get_Cards(); 
  }

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: PaymentdetailpopupPage,
      cssClass: 'my-payment-detail'
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.Get_Cards();
    });
    return await modal.present();
  }

  Get_Cards() {
    this.helper.showLoading();
    this.api.get(endpoints.Get_Card()).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == "Success") {
        this.Card_Detail= resp.data;

        this.helper.hideLoading();
      } else {
        this.helper.hideLoading();
      }


    }, error => {
      console.log(error);
      this.helper.hideLoading();                                                                
    });
  }

  Delete_Card(Card_Id){
    this.helper.showLoading();
    this.api.get(endpoints.Del_Card(Card_Id)).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.status == "Success"){
        this.helper.hideLoading();
        this.Get_Cards();
        this.helper.SuccessToast(resp.msg);
        }else{
          this.helper.hideLoading();
        }
       },error=>{
        console.log(error);
        
        this.helper.hideLoading();  
       });
  }




}
