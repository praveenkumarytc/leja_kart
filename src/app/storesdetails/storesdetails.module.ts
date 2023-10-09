import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoresdetailsPageRoutingModule } from './storesdetails-routing.module';

import { StoresdetailsPage } from './storesdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoresdetailsPageRoutingModule
  ],
  declarations: [StoresdetailsPage]
})
export class StoresdetailsPageModule {}
