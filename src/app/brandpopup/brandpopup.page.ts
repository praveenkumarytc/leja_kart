import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-brandpopup',
  templateUrl: './brandpopup.page.html',
  styleUrls: ['./brandpopup.page.scss'],
})
export class BrandpopupPage implements OnInit {

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

}
