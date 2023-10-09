

import { Component, OnInit } from '@angular/core';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.page.html',
  styleUrls: ['./updatepassword.page.scss'],
})
export class UpdatepasswordPage implements OnInit {
  otp: any = '';
  Newpassword: any = '';
  confirmpassword: any = '';
  UserId: any = '';
  passwordType: any = 'password';
  passwordView: any = 'eye-off-outline';
  passwordType2: any = 'password';
  passwordView2: any = 'eye-off-outline';

  constructor(public helper: HelperserviceService, public api: ApiserviceService, public router: Router, public nav: NavigationService) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.otp = this.router.getCurrentNavigation().extras.state.code;
      this.UserId = this.router.getCurrentNavigation().extras.state.user_id;

    }
    console.log("otp", this.otp);
    console.log("Userid", this.UserId);


  }
  PasswordChange() {
    if (this.Newpassword == '') {
      this.helper.presentToast("Please Enter New Password");
    }
    else if (this.confirmpassword == '') {
      this.helper.presentToast("Please Enter Confirm Password");
    }
    else if (this.Newpassword != this.confirmpassword) {
      this.helper.presentToast("Password Mismatch");
    }
    else {
      this.helper.showLoading();
      this.api.post(endpoints.updatepassword(), {
        otp: this.otp,
        password: this.Newpassword,
        confirm_password: this.confirmpassword,
        user_id: this.UserId

      }).subscribe((resp: any) => {
        console.log(resp);
        console.log("user Id", this.UserId);
        if (resp.status == "success") {
          this.helper.hideLoading();
          this.helper.presentToast(resp.msg);
          this.otp = "";
          this.Newpassword = "";
          this.confirmpassword = "";
          this.nav.go('/login');

        } else {
          this.helper.hideLoading();
          this.helper.presentToast(resp.msg);
          this.otp = "";
          this.Newpassword = "";
          this.confirmpassword = "";
        }
    },error=>{
      console.log(error);
      this.helper.presentToast(error.message);
      
    });

    }

  }
  Password_Visible() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordView = 'eye-outline';
    } else {
      this.passwordType = 'password';
      this.passwordView = 'eye-Off-outline';
    }
  }
  Password_Visible2() {
    if (this.passwordType2 === 'password') {
      this.passwordType2 = 'text';
      this.passwordView2 = 'eye-outline';
    } else {
      this.passwordType2 = 'password';
      this.passwordView2 = 'eye-Off-outline';
    }
  }


}
