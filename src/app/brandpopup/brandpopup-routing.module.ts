import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandpopupPage } from './brandpopup.page';

const routes: Routes = [
  {
    path: '',
    component: BrandpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandpopupPageRoutingModule {}
