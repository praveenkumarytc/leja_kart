import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoresdetailsPage } from './storesdetails.page';

const routes: Routes = [
  {
    path: '',
    component: StoresdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresdetailsPageRoutingModule {}
