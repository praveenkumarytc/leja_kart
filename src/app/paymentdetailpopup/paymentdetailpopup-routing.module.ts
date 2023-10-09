import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentdetailpopupPage } from './paymentdetailpopup.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentdetailpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentdetailpopupPageRoutingModule {}
