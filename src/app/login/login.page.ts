import { Component, OnInit } from '@angular/core';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: any;
  mobile: any;
  pwd: any;
  fromPage: any = '';

  constructor(public helper: HelperserviceService, public api: ApiserviceService, public router: Router, public nav: NavigationService, public platform: Platform, private googlePlus: GooglePlus) {
    this.initializeApp();
  }



  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.fromPage = this.router.getCurrentNavigation().extras.state.from;
    }
    console.log("From", this.fromPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.googlePlus.login({
      //   clientId: '390736558591-dhnjd7omdqb4ukqhe1aiu7900mvj00d9.apps.googleusercontent.com',
      //   scopes: ['profile', 'email'],
      //   grantOfflineAccess: true,
      // });
    });
  }


  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }

    return (false)
  }

  Login() {
    if (this.email == '' || this.email == null) {
      this.helper.presentToast("Please Enter your email");
    }
    else if (this.ValidateEmail(this.email) == false) {
      this.helper.presentToast("You have entered an invalid email address!");
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
    else {
      this.helper.showLoading();
      this.api.post(endpoints.signin(), {
        email: this.email,
        mobile_number: this.mobile,
        password: this.pwd,
      }).subscribe((resp: any) => {

        console.log(resp);

        if (resp.status == "success") {
          this.helper.hideLoading();
          localStorage.setItem('quantamToken', resp.data.token);
          localStorage.setItem('User_Id', resp.data.user.id);
          this.api.user_id = localStorage.getItem('User_Id');
          this.api.name = resp.data.user.name;
          this.api.email = resp.data.user.email
          console.log("user_id", this.api.user_id);
          this.helper.SuccessToast(resp.msg);
          this.router.navigateByUrl('tabs/home');
          this.email = "";
          this.pwd = "";
          this.mobile = "";
          if (this.fromPage == 'ProductdetailPage') {
            const navigationExtras: NavigationExtras = {
              state: {
                from: this.fromPage
              }
            };
            this.nav.go('/productdetails', navigationExtras);
          }
        }
        else {
          this.helper.hideLoading();
          this.helper.presentToast(resp.msg);
          this.email = "";
          this.pwd = "";
          this.mobile = "";
        }
      });

    }
  }

  // async doLogin() {
  //   const googleuser = await GoogleAuth.signIn();
  //   console.log("user======>",googleuser);   
  // }

  Google_Login() {
    this.googlePlus.login({}).then((resp: any) => {
      console.log("google_user=====>", resp);
      if (resp) {
        localStorage.setItem('Google_UserId', resp.userId);
        this.api.Google_userid = localStorage.getItem('Google_UserId');
        this.api.Google_email = resp.email;
        this.api.Google_name = resp.displayName;
        if (this.api.Google_userid) {
          this.goToHome(this.api.Google_userid);
        }

      }
    }, error => {
      console.log(error);

    });
  }

  goToHome(Google_userid) {
    const navigationExtras: NavigationExtras = {
      state:
      {
        user: this.api.Google_userid
      }
    };
    this.router.navigate(['tabs/home'], navigationExtras);
    console.log("Googleuserid", Google_userid);
  }
}