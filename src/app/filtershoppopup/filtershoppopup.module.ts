import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltershoppopupPageRoutingModule } from './filtershoppopup-routing.module';

import { FiltershoppopupPage } from './filtershoppopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltershoppopupPageRoutingModule
  ],
  declarations: [FiltershoppopupPage]
})
export class FiltershoppopupPageModule {}
