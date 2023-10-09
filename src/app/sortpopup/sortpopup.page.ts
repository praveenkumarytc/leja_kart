import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sortpopup',
  templateUrl: './sortpopup.page.html',
  styleUrls: ['./sortpopup.page.scss'],
})
export class SortpopupPage implements OnInit {

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

}
