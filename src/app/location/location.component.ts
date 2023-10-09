import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { logging } from 'protractor';
import { ApiserviceService } from '../service/apiservice.service';


declare var google;






@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;
  lat: string;
  long: string;
  autocomplete: { input: string; };
  autocompleteItems: any = [];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  latitude: any;
  longitude: any;


  constructor(public popover: PopoverController,
    public alert: AlertController,
    private modalCtrl: ModalController,
    public zone: NgZone,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public api: ApiserviceService
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

  }

  ngOnInit() {


  }

  closeModal() {
    // this.modalCtrl.dismiss();
    this.modalCtrl.dismiss().then((data) => {
      data = this.location
      console.log("Current_Address",data);

    });
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("response", resp);

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      console.log("latLng", latLng);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      console.log("mapOptions", mapOptions);


      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
      console.log("getAddressFromCoords", this.getAddressFromCoords);
      this.closeModal();

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      console.log("map", this.map);

      this.map.addListener('tilesloaded', () => {
        console.log('accuracy', this.map, this.map.center.lat());
        console.log('accuracy', this.map, this.map.center.lng());

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
        this.lat = this.map.center.lat();
        this.long = this.map.center.lng();
      });
      

    }).catch((error) => {
      console.log('Error getting location', error);
      this.closeModal();
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);     
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        console.log("result", result);
      this.api.location= result[0].thoroughfare;
         this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });
  }

  ShowCords() {
    alert('lat' + this.lat + ', long' + this.long)
  }

  UpdateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        console.log("predictions", predictions);
        console.log("status", status);


        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  SelectSearchResult(item) {
    // alert(JSON.stringify(item))      
    this.placeid = item.place_id
    this.autocompleteItems = [];
    let base = this;
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      base.zone.run(() => {
        if (status === 'OK' && results[0]) {
          console.log(results[0].geometry.location.lat());
          console.log(results[0].geometry.location.lng());
          console.log(results[0].formatted_address);
          base.latitude = results[0].geometry.location.lat();
          base.longitude = results[0].geometry.location.lng();
          base.location = results[0].formatted_address;
          localStorage.setItem('currentlocation', base.location);
          this.api.location = localStorage.getItem('currentlocation');
          console.log("location=======>", this.api.location);
          this.closeModal();
        }
      });
    });

  }

  ClearAutocomplete() {
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }

  GoTo() {
    return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' + this.placeid;
  }


}
