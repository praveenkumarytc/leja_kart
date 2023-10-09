import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrandpopupPageRoutingModule } from './brandpopup-routing.module';

import { BrandpopupPage } from './brandpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrandpopupPageRoutingModule
  ],
  declarations: [BrandpopupPage]
})
export class BrandpopupPageModule {}
