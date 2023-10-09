import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateproductPage } from './rateproduct.page';

const routes: Routes = [
  {
    path: '',
    component: RateproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateproductPageRoutingModule {}
