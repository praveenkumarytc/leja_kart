import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { HelperserviceService } from '../service/helperservice.service';
import { NavigationService } from '../service/navigation.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {
  About: any = '';

  constructor(
    public api: ApiserviceService,
    public router: Router,
    public helper: HelperserviceService,
    public nav: NavigationService,

  ) { }

  ngOnInit() {
    this.helper.showLoading();
    this.api.get(endpoints.About_Us()).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == 'success') {
        this.About = resp.data.about_us[0].description;
        this.helper.hideLoading();
      } else {
        this.helper.hideLoading();
      }
    }, error => {
      if (error) {
        this.helper.hideLoading();
      }
    });
  }

}
