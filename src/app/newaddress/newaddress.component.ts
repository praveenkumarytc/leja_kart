import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddaddressPage } from '../addaddress/addaddress.page';
import { Router } from '@angular/router';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
import {PopoverController} from '@ionic/angular';


@Component({
  selector: 'app-newaddress',
  templateUrl: './newaddress.component.html',
  styleUrls: ['./newaddress.component.scss'],
})
export class NewaddressComponent implements OnInit {
  @Input() add: string;
 
  

  constructor(public modalController: ModalController,public helper: HelperserviceService, public api: ApiserviceService, public router: Router, public nav: NavigationService, private pop: PopoverController) { 
    
  }

  ngOnInit() {
    console.log("add_id",this.add);
    
  }
  goToEdit(){
    this.pop.dismiss();
    const navigationExtras: NavigationExtras = {
      state: {
      add_id  : this.add ,
      }
    };
    this.nav.go('checkouteditaddress', navigationExtras);
  }
 

}
