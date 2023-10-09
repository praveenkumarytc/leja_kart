import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatingReviewPageRoutingModule } from './rating-review-routing.module';

import { RatingReviewPage } from './rating-review.page';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingReviewPageRoutingModule,
    IonicRatingModule
    
  ],
  declarations: [RatingReviewPage]
})
export class RatingReviewPageModule {}
