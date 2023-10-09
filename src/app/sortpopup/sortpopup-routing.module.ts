import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SortpopupPage } from './sortpopup.page';

const routes: Routes = [
  {
    path: '',
    component: SortpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SortpopupPageRoutingModule {}
