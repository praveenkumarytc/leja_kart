import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private navController: NavController, public location: Location) { }
  goBack() {
    this.navController.pop();
  }

  back() {
    this.location.back();
  }

  go(path: string, options?): void {
    if (options) {
      this.navController.navigateForward(path, options);
    } else {
      this.navController.navigateForward(path);
    }
  }

  currentPage(path, obj) {
    this.navController.navigateRoot(['/' + path, obj]);
  }
}
