import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BrandpopupPage } from '../brandpopup/brandpopup.page';
import { SortpopupPage } from '../sortpopup/sortpopup.page';
import { FiltershoppopupPage } from '../filtershoppopup/filtershoppopup.page';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-storesdetails',
  templateUrl: './storesdetails.page.html',
  styleUrls: ['./storesdetails.page.scss'],
})
export class StoresdetailsPage implements OnInit {
  storeid: any = '';
  category: any = [];
  store: any = [];
  storedetail: any = {};
  userdetail: any = {};
  products: any = [];
  Pageload = true;
  Rating_review:object={};
  

  constructor(public modalController: ModalController, public helper: HelperserviceService, public api: ApiserviceService, public router: Router, public nav: NavigationService) { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: BrandpopupPage,
      cssClass: 'brand-popup',
    });
    return await modal.present();
  }
  async presentModalsecond() {
    const modal = await this.modalController.create({
      component: SortpopupPage,
      cssClass: 'sort-popup',
    });
    return await modal.present();
  }

  connect = 'Vegetables';

  type: string;

  ngOnInit() {
    //  this.type = 'Fruits';  
    if (this.router.getCurrentNavigation().extras.state) {
      this.storeid = this.router.getCurrentNavigation().extras.state?.id;
      this.Storedetail();
      // this.StoreProduct('Fruits');
    }
    console.log("storeid", this.storeid);
    this.api.store_id = this.storeid;
    console.log("store_id",this.api.store_id);
  }

  btnaction(type) {
    this.connect = type;
  }

  Storedetail() {
     this.helper.showLoading();
    this.api.get(endpoints.store_detail(this.storeid)).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == "success") {
        this.category = resp.data.category_array;
      
        
        if (this.category) {
          this.type = this.category[0];
          this.StoreProduct(this.type);
          this.helper.hideLoading();
        }
        this.store = resp.data.store.subcategory;
        this.storedetail = resp.data.store;
        this.userdetail = resp.data.store.user_details;
        this.Rating_review = resp.data;
        console.log(this.store);
        this.helper.hideLoading();
        this.Pageload = false;
      } else {
        this.helper.hideLoading();
      }
    }, error => {
      this.helper.hideLoading();
    });
  }

  StoreProduct(cat) {

    console.log(cat);
     this.helper.showLoading();

    this.api.get(endpoints.store_product(this.storeid, cat)).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == "success") {
        this.products = resp.data.product;
        this.helper.hideLoading();
        console.log("productlists", this.products);
      } else {
        this.helper.hideLoading();
      }
    }, error => {
      if (error) {
        this.helper.hideLoading();
      }
    });
  }
  go_detail(prodId) {

    const navigationExtras: NavigationExtras = {
      state: {
        product_id: prodId,
      }
    };
    this.nav.go('/productdetails', navigationExtras);
  }

}
