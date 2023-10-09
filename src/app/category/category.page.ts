import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
import { HelperserviceService } from '../service/helperservice.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  AllCategory: any=[];

  constructor(public api: ApiserviceService, public router: Router, public nav: NavigationService, public helper: HelperserviceService) { }

  ngOnInit() {
  
  }

  ionViewWillEnter(){
    this.helper.showLoading();
    this.api.get(endpoints.Productcategory()).subscribe((resp: any) => {
      console.log(resp);
      
      if(resp.status == "success"){
        this.AllCategory= resp.data.category;
        this.helper.hideLoading();
        }
    });
  }
  go_subcat(id){
    const navigationExtras: NavigationExtras = {
      state: {
        Id: id
      }

    };
     this.nav.go('/categorylist', navigationExtras);
  }


}
