import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckouteditaddressPage } from './checkouteditaddress.page';

const routes: Routes = [
  {
    path: '',
    component: CheckouteditaddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckouteditaddressPageRoutingModule {}
