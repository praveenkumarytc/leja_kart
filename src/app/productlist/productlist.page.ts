import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {
  Category_id: any = '';
  Subcategory_id: any = '';
  Products: any = [];
  Multipleimages: any = [];
  allproduct:any='';

  constructor(public helper: HelperserviceService, public api: ApiserviceService, public router: Router, public nav: NavigationService) { 
    if (this.router.getCurrentNavigation().extras.state) {
      this.Category_id = this.router.getCurrentNavigation().extras.state?.catId;
      this.Subcategory_id = this.router.getCurrentNavigation().extras.state?.subcatId;
         this.allproduct = this.router.getCurrentNavigation().extras.state?.product;
         this.ProductList();
     
    }
    console.log("Category_id", this.Category_id);
    console.log("subcat_id", this.Subcategory_id);
    console.log("product",this.allproduct);
  }

  ngOnInit() {
       
  }
    ionViewWillEnter(){
     this.AllProduct();
      }
    
  ProductList() {
    this.helper.showLoading();
    this.api.get(endpoints.Prod_list(this.Category_id, this.Subcategory_id)).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == "success") {
        this.Products = resp.data.products;
        this.helper.hideLoading();
        console.log("products", this.Products);
        this.Products.forEach(element => {
          element.images = JSON.parse( element.images );
          this.helper.hideLoading();
          // console.log(element.images );
      });
      }else{
        this.helper.hideLoading();
      }
    }, error =>{
      console.log(error);
      
      this.helper.hideLoading();        
    });
  }
  AllProduct(){
    if(this.allproduct === 'product'){
    this.api.get(endpoints.HomeProduct()).subscribe((resp: any) => {
      console.log(resp);
      if(resp.status == "success"){
        this.Products = resp.data.all_products;
        console.log(this.Products);
        this.Products.forEach(element => {
          element.images = JSON.parse( element.images );
            });
         }
         });
         }
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
