import { Component, OnInit } from '@angular/core';
import { HelperserviceService } from '../service/helperservice.service';
import { ApiserviceService } from '../service/apiservice.service';
import { endpoints } from '../common/endpoint';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from '../service/navigation.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  email:any;

  constructor(public helper: HelperserviceService,public api:ApiserviceService,public router:Router,public nav:NavigationService) { }

  ngOnInit() {
  }
  ValidateEmail(mail){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
     {
       return (true)
     }
      
       return (false)
   }
  Forgetpassword(){
    if(this.email == '' || this.email == null){
      this.helper.presentToast("Please Enter your email");
    }
    else if(this.ValidateEmail(this.email)==false){
       this.helper.presentToast("You have entered an invalid email address!");
    }
    else{
      this.helper.showLoading();
      this.api.post(endpoints.resetpassword(),{
        email:this.email
      }).subscribe((resp:any) =>{
         console.log(resp);
         if (resp.status =="success") {
           this.helper.hideLoading();
           this.helper.presentToast(resp.msg);
          
    const navigationExtras: NavigationExtras = {
            state: {
              otp: resp.data.otp,
              user_id:resp.data.user_id
            }
          };
          this.nav.go('/otpverification', navigationExtras);
          console.log("otp",resp.data.otp);
          console.log("userId",resp.data.user_id);
          
          
         
           } else {
          this.helper.hideLoading();
          this.helper.presentToast(resp.msg);
        }
           });

    }

  }

}
