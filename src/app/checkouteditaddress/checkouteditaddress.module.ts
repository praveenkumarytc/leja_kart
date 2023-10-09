import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckouteditaddressPageRoutingModule } from './checkouteditaddress-routing.module';

import { CheckouteditaddressPage } from './checkouteditaddress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckouteditaddressPageRoutingModule
  ],
  declarations: [CheckouteditaddressPage]
})
export class CheckouteditaddressPageModule {}
