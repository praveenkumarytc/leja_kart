import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiserviceService } from './apiservice.service';
import { HelperserviceService } from './helperservice.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  

  constructor(
    public api:ApiserviceService,public helper:HelperserviceService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //  console.log('quantamToken', localStorage.getItem('quantamToken'))
    if (localStorage.getItem('quantamToken') != '' || localStorage.getItem('quantamToken') != undefined || localStorage.getItem('quantamToken') != null) {
     
      request = request.clone({
        setHeaders: {
          
           Authorization: `Bearer ${localStorage.getItem('quantamToken')}`,
        
          'Content-Type': 'application/json',
          'custom-token': environment.customtoken,
          
        }
      });
    }
    else {
      console.log('else part');
      request = request.clone({
        setHeaders: {
          
          'custom-token': environment.customtoken
        }
      });
    }
    return next.handle(request);
  }
  intercept1(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  
    request = request.clone({});
    //return next.handle(request);
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this.helper.hideLoading();
              if (error.error.message) {
                    
                        this.helper.presentToast(error.error.message);   
                  }
                  else {
                    console.log("inside else")
                    this.helper.presentToast('Something went wrong try again later');
                  }
        return throwError(error);
      })
    )
  }
}
