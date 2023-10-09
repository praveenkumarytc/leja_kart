import { Component, OnInit } from '@angular/core';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  fname: any;
  lname: any;
  email: any;
  mobile: any;
  pwd: any;
  con_pwd: any;
  userdetail: any = {};

  constructor(public helper: HelperserviceService, public api: ApiserviceService, public router: Router) { }
  ngOnInit() {

  }
  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }

    return (false)
  }
  signUp() {
    console.log(this.fname, this.lname, this.email, this.mobile, this.pwd, this.con_pwd);
    if (this.fname == '' || this.fname == null) {
      this.helper.presentToast("Please Enter your First Name");
    }
    else if (this.lname == '' || this.lname == null) {
      this.helper.presentToast("Please Enter your Last Name");
    }
    else if (this.email == '' || this.email == null) {
      this.helper.presentToast("Please Enter your email");
    }
    else if (this.ValidateEmail(this.email) == false) {
      this.helper.presentToast("You have entered an invalid email address!")
    }
    else if (this.mobile == '' || this.mobile == null) {
      this.helper.presentToast("Please Enter your Mobile Number");
    }
    else if (this.mobile.length < 10) {
      this.helper.presentToast("Please Enter Valid Mobile Number");
    }
    else if (this.pwd == '' || this.pwd == null) {
      this.helper.presentToast("Please Enter the Password");
    }
    else if (this.con_pwd == '' || this.con_pwd == null) {
      this.helper.presentToast("Please Confirm your password");
    }
    else if (this.pwd != this.con_pwd) {
      this.helper.presentToast("Password Mismatched");
    }
    else {
      this.helper.showLoading();
      var param = {
        first_name: this.fname,
        last_name: this.lname,
        email: this.email,
        password: this.pwd,
        confirm_password: this.con_pwd,
        mobile_number: this.mobile
      }


    }

    this.api.post(endpoints.signup(), param).subscribe((resp: any) => {
      console.log(resp);
      //  this.helper.hideLoading();
      if (resp.status == "success") {
        this.helper.hideLoading();
        this.helper.presentToast(resp.msg);
        this.fname = "";
        this.lname = "";
        this.email = "";
        this.pwd = "";
        this.con_pwd = "";
        this.mobile = "";
        this.router.navigateByUrl('/login');
      }
      else {

        if (resp.msg.email) {
          this.helper.hideLoading();
          this.helper.presentToast(resp.msg.email[0]);
          this.fname = "";
          this.lname = "";
          this.email = "";
          this.pwd = "";
          this.con_pwd = "";
          this.mobile = "";
        }
        else {
          this.helper.hideLoading();
          this.helper.presentToast(resp.msg.mobile_number[0]);
          this.fname = "";
          this.lname = "";
          this.email = "";
          this.pwd = "";
          this.con_pwd = "";
          this.mobile = "";
        }

      }


    });
    error => {
      this.helper.presentToast("There is some problem");

    }







  }

}
