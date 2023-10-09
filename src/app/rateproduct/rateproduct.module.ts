import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateproductPageRoutingModule } from './rateproduct-routing.module';

import { RateproductPage } from './rateproduct.page';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateproductPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [RateproductPage]
})
export class RateproductPageModule {}
