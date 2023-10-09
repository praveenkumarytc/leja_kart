import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SortpopupPageRoutingModule } from './sortpopup-routing.module';

import { SortpopupPage } from './sortpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SortpopupPageRoutingModule
  ],
  declarations: [SortpopupPage]
})
export class SortpopupPageModule {}
