import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersdetailsPage } from './ordersdetails.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersdetailsPageRoutingModule {}
