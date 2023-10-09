import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccounteditpopupPageRoutingModule } from './accounteditpopup-routing.module';

import { AccounteditpopupPage } from './accounteditpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccounteditpopupPageRoutingModule
  ],
  declarations: [AccounteditpopupPage]
})
export class AccounteditpopupPageModule {}
