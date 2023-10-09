import { Component, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.page.html',
  styleUrls: ['./categorylist.page.scss'],
})
export class CategorylistPage implements OnInit {
Category_id:any='';
Subcat_list:any=[];
  constructor(public helper: HelperserviceService, public api: ApiserviceService, public router: Router, public nav: NavigationService) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.Category_id = this.router.getCurrentNavigation().extras.state.Id;
      this.Subcategories();
        }
    console.log("category_id",this.Category_id);
  }
  Subcategories(){
     this.helper.showLoading();
    this.api.get(endpoints.Sub_cat(this.Category_id)).subscribe((resp: any) => {
      console.log(resp);
      if(resp.status == "success"){
        this.Subcat_list=resp.data.sub_category;
        this.helper.hideLoading();
        if(this.Subcat_list.length < 1){
          this.helper.presentToast('subcategory is empty!');
        }
      }
      else{
         this.helper.hideLoading();
      }
        }, error=> {
          this.helper.hideLoading();
          console.log(error);
          });
  }
  go_productlist(cat_id,subcat_id){
    const navigationExtras: NavigationExtras = {
      state: {
      catId: cat_id,
      subcatId:subcat_id
      }
    };
     this.nav.go('/productlist', navigationExtras);
  }
}
