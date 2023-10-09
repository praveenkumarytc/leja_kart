import { Component, OnInit } from '@angular/core';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.page.html',
  styleUrls: ['./otpverification.page.scss'],
})
export class OtpverificationPage implements OnInit {
  otp: any = '';
  number1: any = '';
  number2: any = '';
  number3: any = '';
  number4: any = '';
  string: any = '';
  access = true;
  UserId: any = '';
  passwordType: any = 'password';
  passwordView: any = 'eye-off-outline';

  constructor(public helper: HelperserviceService, public api: ApiserviceService, public router: Router, public nav: NavigationService) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.otp = this.router.getCurrentNavigation().extras.state.otp;
      this.UserId = this.router.getCurrentNavigation().extras.state.user_id;
    }
    console.log("otp", this.otp);
    console.log("UserId", this.UserId);
}

  moveFocus(nextElement, e, prevElement) {
    if (e.key === 'Backspace') {
      if (nextElement.value === '') {
        prevElement.setFocus();
      }
    } else if (e.key !== 'Backspace' && e.key !== ' ') {
      nextElement.setFocus();
    }
  }
  generateNumber() {
    this.string = this.number1 + this.number2 + this.number3 + this.number4;

    if (this.string.length == 4) {
      this.access = false;
    }
    else {
      this.access = true;

    }
    console.log(this.string);

  }
  VerifyPassword() {
    this.helper.showLoading();
    if (this.string == this.otp) {
      const navigationExtras: NavigationExtras = {
        state: {
          code: this.otp,
          user_id: this.UserId
        }
      };
      this.number1 = '';
      this.number2 = '';
      this.number3 = '';
      this.number4 = '';

      this.helper.hideLoading();
      this.helper.presentToast('OTP Successfully Verified');

      this.nav.go('/updatepassword', navigationExtras);


    }
    else {
      this.number1 = '';
      this.number2 = '';
      this.number3 = '';
      this.number4 = '';
      this.helper.hideLoading();
      this.helper.presentToast('Wrong OTP');


    }
  }

}
