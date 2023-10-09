import { Component } from '@angular/core';
import { ApiserviceService } from '../service/apiservice.service';
import { OnInit } from '@angular/core';
import { endpoints } from '../common/endpoint';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
import { HelperserviceService } from '../service/helperservice.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { LocationComponent } from '../location/location.component';
// import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  categoryslide = {
    initialSlide: 0,
    speed: 1500,
    autoplay: true,
    slidesPerView: 4.2,
    spaceBetween: 15,
  };
  slidefirst = {
    initialSlide: 1,
    slidesPerView: 1,
    autoplay: true,
    speed: 2000,
    grabCursor: true,
  };
  storesslide = {
    initialSlide: 0,
    speed: 1500,
    autoplay: true,
    slidesPerView: 1.05,
    spaceBetween: 10,
  };
  productslide = {
    initialSlide: 0,
    speed: 1500,
    autoplay: true,
    slidesPerView: 2.2,
    spaceBetween: 16,
  };
  AllCategory: any = [];
  Products: any = [];
  Storelist: any = [];
  Imagebannner: any = [];
  pageload = true;
  lazyloadGif: any = 'assets/images/loader.gif';
  roleMsg: string;
  googleuser:any;

  constructor(public api: ApiserviceService,
    public router: Router,
    public nav: NavigationService,
    public helper: HelperserviceService,
    public popover: PopoverController,
    public alert: AlertController,
    public modalController: ModalController,

  ) { }
  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.googleuser = this.router.getCurrentNavigation().extras.state.user;
    }
    this.Fetchcategory();
    this.ProductList();
    this.Storelisting();
    this.Banner();
    this.api.name;
    console.log('name', this.api.name);
    console.log("googleuser======>",this.googleuser);
    }
  async presentModal() {
    const modal = await this.modalController.create({
      component: LocationComponent,
      cssClass: 'location-modal',
      backdropDismiss: true,
    });
    return await modal.present();
  }

  Fetchcategory() {
    this.api.get(endpoints.Productcategory()).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == "success") {
        this.AllCategory = resp.data.category;
        this.AllCategory.map((e) => {
          if (e.category_image) {
            e.imgLoad = true;
          }
        })
        console.log(this.AllCategory);
      }
    }, error => {
      console.log('err', error);
    });
  }
  go_categorylist(id) {
    const navigationExtras: NavigationExtras = {
      state: {
        Id: id
        }
    };
    this.nav.go('/categorylist', navigationExtras);
    console.log("category_id", id);
  }

  ProductList() {
    this.api.get(endpoints.HomeProduct()).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == "success") {
        this.Products = resp.data.all_products;
      }
    },error=>{
      console.log("error",error); 
    });
  }

  go_productlist(data) {
    const navigationExtras: NavigationExtras = {
      state: {
        product: data,
      }
    };
    this.nav.go('/productlist', navigationExtras);
  }

  go_Productdetail(id) {
    const navigationExtras: NavigationExtras = {
      state: {
        product_id: id,
      }
    };
    this.nav.go('/productdetails', navigationExtras);
  }
  
  Storelisting() {
    this.helper.showLoading();
    this.api.get(endpoints.store()).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == "success") {
        this.Storelist = resp.data.store;
        this.helper.hideLoading();
        this.pageload = false;
      }
      else {
        this.helper.hideLoading();
        this.pageload = false;
      }
    }, error => {
      console.log(error);
      this.helper.hideLoading();
      this.pageload = false;
    });
  }

  go_storedetail(storeid) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: storeid,
      }
    };
    this.nav.go('/storesdetails', navigationExtras);
  }
  go_store() {
    this.nav.go('stores');
  }

  Banner() {
    this.api.get(endpoints.HomeBanner()).subscribe((resp: any) => {
      console.log("Banner", resp);
      if (resp.status == 'success') {
        this.Imagebannner = resp.data.banner;
        console.log(this.Imagebannner);
        this.Imagebannner.map((e) => {
          if (e.image) {
            e.imgLoad = true;
          }
        })
      }
    },error=>{
      console.log("error",error.message);
    });
  }
}

