import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  baseUrl:any = environment.baseUrl;
  customtoken:any='f7ff9e8b7bb2e09b70935a5d785e0cc5d9d0abf0';
  user_id:any='';
  name:any='';
  email:any='';
  location:any='';
  store_id:any='';
  product_id:any='';
  image:any='';
  Google_userid:any='';
  Google_email:any='';
  Google_name:any='';
 

  constructor(public http: HttpClient) { }
  
    
  

  get(endPoint: string): Observable<any> {
    return this.http.get(this.baseUrl + endPoint);
  }
  post(endPoint: string, body: any): Observable<any> {
    return this.http.post(this.baseUrl + endPoint, body);
  }
}
