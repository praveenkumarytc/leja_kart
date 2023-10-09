import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { endpoints } from './common/endpoint';
import { ApiserviceService } from './service/apiservice.service';
import { HelperserviceService } from './service/helperservice.service';
import { NavigationService } from './service/navigation.service';
import { NavigationExtras } from '@angular/router';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { LocationComponent } from './location/location.component';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';

// import { Geolocation } from '@capacitor/geolocation';





@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public currentPage: any;
  public appPages = [
    {
      title: 'Home',
      url: 'tabs/home',
      icon: 'home'
    },
    {
      title: 'My Orders',
      url: '/orderlist',
      icon: 'cart'
    },
    {
      title: 'Stores',
      url: '/stores',
      icon: 'storefront'
    },
    {
      title: 'My Account',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'About Us',
      url: '/aboutus',
      icon: 'information-circle'
    },
    {
      title: 'Help Center',
      url: '/contactus',
      icon: 'call'
    },


  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(public router: Router,
    public modalController: ModalController,
    public helper: HelperserviceService,
    public api: ApiserviceService,
    public nav: NavigationService,
    private popoverController: PopoverController,
    public platform: Platform,
    public location: Location,
    public alertCtrl: AlertController,
    public googleplus: GooglePlus
  ) {
    this.initializeApp();
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        console.log(e.url);
        this.currentPage = e.url;
      }
    });
  }

  ngOnInit() {
    this.api.name;
    console.log("name", this.api.name);
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await SplashScreen.show({
        showDuration: 2000,
        autoHide: true,
      });
    });

    setTimeout(() => {
      App.addListener('backButton', () => {
        console.log(this.currentPage);
        if (this.currentPage == '/') {
          this.confirmExitApp();
        }
        else if (this.currentPage == '/tabs/home') {
          App.exitApp();
        }
        else if (this.currentPage == '/login') {
          this.confirmExitApp();
        }
        else if (this.currentPage == '/checkout') {
          this.nav.go('/tabs/home');
        }
        else {
          window.history.back();
        }
      });

    }, 1000);

  }


  Logout() {
    this.api.user_id = localStorage.getItem('User_Id');
    this.api.post(endpoints.Log_out(), {
    }).subscribe((resp: any) => {
      console.log(resp);
      if (resp) {
        localStorage.removeItem('User_Id');
        this.api.name = '';
        this.api.email = '';
      }
    });
  }
  async confirmExitApp() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation Exit',
      message: 'Are you sure you want to exit ?',
      backdropDismiss: false,
      cssClass: 'confirm-exit-alert',
      buttons: [{
        text: 'Stay',
        role: 'cancel',
      }, {
        text: 'Exit app',
        handler: () => {
          App.exitApp();
        }
      }]
    });
    await alert.present();
  }

  signout() {
    if (this.api.Google_userid) {
      this.googleplus.logout().then((resp) => {
        console.log("resp", resp);
        if (resp) {
          localStorage.removeItem('Google_UserId');
          this.api.Google_name = '';
          this.api.Google_email = '';
          this.router.navigate(['login']);
        }
      });
    }
  }
}
