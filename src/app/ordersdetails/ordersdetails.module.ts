import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersdetailsPageRoutingModule } from './ordersdetails-routing.module';

import { OrdersdetailsPage } from './ordersdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersdetailsPageRoutingModule
  ],
  declarations: [OrdersdetailsPage]
})
export class OrdersdetailsPageModule {}
