import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FiltershoppopupPage } from '../filtershoppopup/filtershoppopup.page';
import { Router } from '@angular/router';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';


@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {
  Storelist:any=[];
  subcat:any=[];
  search_store:any='';
  
  constructor(public modalController: ModalController,public helper: HelperserviceService, public api: ApiserviceService, public router: Router, public nav: NavigationService) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: FiltershoppopupPage,
      cssClass: 'filter-shop-popup',
    });
    return await modal.present();
  }

  connect = 'newest';

  type: string;

  ngOnInit() {
    this.type = 'popular';
    this.Storelisting();
  }

  btnaction(type) {
    this.connect = type;
  }


  getstore(event){
    let store
   store = event.detail.value;
   console.log(store);
   
   
    
}
  Storelisting(){
    this.helper.showLoading();
    this.api.get(endpoints.store()).subscribe((resp: any) => {
      console.log(resp);
      if(resp.status == "success"){
        this.Storelist = resp.data.store;
        this.helper.hideLoading();
     
    }
    else{
      this.helper.hideLoading();
    }
    },error =>{
   this.helper.hideLoading();
    });
  }
  go_detail(storeid){
      
    
      const navigationExtras: NavigationExtras = {
        state: {
          id: storeid,
        }
      };
      this.nav.go('/storesdetails', navigationExtras);
    
  }
}
