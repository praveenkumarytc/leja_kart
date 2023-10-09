import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentdetailpopupPageRoutingModule } from './paymentdetailpopup-routing.module';

import { PaymentdetailpopupPage } from './paymentdetailpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentdetailpopupPageRoutingModule
  ],
  declarations: [PaymentdetailpopupPage]
})
export class PaymentdetailpopupPageModule {}
