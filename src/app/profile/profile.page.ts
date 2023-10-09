import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { ApiserviceService } from '../service/apiservice.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  selectedImage: any;

  constructor(public api: ApiserviceService) { }

  ngOnInit() {
    console.log("User_name",this.api.name);
    
  }

  checkPlatform() {
    if (Capacitor.getPlatform() == 'android' || Capacitor.getPlatform() == 'ios') {
      return true;
    }
    return false;
  }

  async Get_Picture() {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source: CameraSource.Prompt,
      // resultType: CameraResultType.Uri,
      width: 600,
      resultType: this.checkPlatform() ? CameraResultType.DataUrl : CameraResultType.Uri
    });
    console.log('image: ', image);
    this.selectedImage = image;
    if (this.checkPlatform()) {
      this.selectedImage.webPath = image.dataUrl;
      console.log("image=====>", this.selectedImage.webPath);
    }
  }
}
