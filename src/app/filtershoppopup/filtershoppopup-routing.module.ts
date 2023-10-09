import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltershoppopupPage } from './filtershoppopup.page';

const routes: Routes = [
  {
    path: '',
    component: FiltershoppopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltershoppopupPageRoutingModule {}
