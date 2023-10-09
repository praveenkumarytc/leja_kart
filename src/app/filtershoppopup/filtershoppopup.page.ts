import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filtershoppopup',
  templateUrl: './filtershoppopup.page.html',
  styleUrls: ['./filtershoppopup.page.scss'],
})
export class FiltershoppopupPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
