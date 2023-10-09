import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  Search_item: any = [];
  search_product: any = '';
  isItemAvailable = false;
  constructor(public helper: HelperserviceService, public api: ApiserviceService, public router: Router, public nav: NavigationService) { }

  ngOnInit() {


  }

  Searchlist() {
    this.api.post(endpoints.Search(), {
      query: this.search_product
    }).subscribe((resp: any) => {
      console.log(resp);
      console.log(this.search_product);

      if (resp) {
        this.Search_item = resp;
      } else {
        this.Search_item = [];
      }
    });
  }
  getItems(ev: any) {

    this.Searchlist();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.Search_item = this.Search_item.filter((Search_item) => {
        return (Search_item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
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


