import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccounteditpopupPage } from './accounteditpopup.page';

const routes: Routes = [
  {
    path: '',
    component: AccounteditpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccounteditpopupPageRoutingModule {}
