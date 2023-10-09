import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class HelperserviceService {
  isLoading: any;
  userdetail:any='';

  constructor(public toastController: ToastController,public loadingCtrl: LoadingController) { }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color : 'danger',
      position: 'top'
    });
    toast.present();
  }
  async SuccessToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color : 'success',
      position: 'top'
    });
    toast.present();
  }
  async showLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      // mode: 'ios'
      cssClass: 'loader_class',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async hideLoading() {
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
    }
    return null;
  }

}
