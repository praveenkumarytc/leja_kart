import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },

  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'productdetails',
    loadChildren: () => import('./productdetails/productdetails.module').then( m => m.ProductdetailsPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'ordersdetails',
    loadChildren: () => import('./ordersdetails/ordersdetails.module').then( m => m.OrdersdetailsPageModule)
  },
  {
    path: 'accountsettings',
    loadChildren: () => import('./accountsettings/accountsettings.module').then( m => m.AccountsettingsPageModule)
  },
  {
    path: 'accounteditpopup',
    loadChildren: () => import('./accounteditpopup/accounteditpopup.module').then( m => m.AccounteditpopupPageModule)
  },
  {
    path: 'paymentdetail',
    loadChildren: () => import('./paymentdetail/paymentdetail.module').then( m => m.PaymentdetailPageModule)
  },
  {
    path: 'paymentdetailpopup',
    loadChildren: () => import('./paymentdetailpopup/paymentdetailpopup.module').then( m => m.PaymentdetailpopupPageModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./stores/stores.module').then( m => m.StoresPageModule)
  },
  {
    path: 'productlist',
    loadChildren: () => import('./productlist/productlist.module').then( m => m.ProductlistPageModule)
  },
  {
    path: 'filtershoppopup',
    loadChildren: () => import('./filtershoppopup/filtershoppopup.module').then( m => m.FiltershoppopupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'otpverification',
    loadChildren: () => import('./otpverification/otpverification.module').then( m => m.OtpverificationPageModule)
  },
  {
    path: 'updatepassword',
    loadChildren: () => import('./updatepassword/updatepassword.module').then( m => m.UpdatepasswordPageModule)
  },
  
  {
    path: 'categorylist',
    loadChildren: () => import('./categorylist/categorylist.module').then( m => m.CategorylistPageModule)
  },
  {
    path: 'addaddress',
    loadChildren: () => import('./addaddress/addaddress.module').then( m => m.AddaddressPageModule)
  },
  {
    path: 'storesdetails',
    loadChildren: () => import('./storesdetails/storesdetails.module').then( m => m.StoresdetailsPageModule)
  },
  {
    path: 'brandpopup',
    loadChildren: () => import('./brandpopup/brandpopup.module').then( m => m.BrandpopupPageModule)
  },
  {
    path: 'sortpopup',
    loadChildren: () => import('./sortpopup/sortpopup.module').then( m => m.SortpopupPageModule)
  },
  {
    path: 'checkouteditaddress',
    loadChildren: () => import('./checkouteditaddress/checkouteditaddress.module').then( m => m.CheckouteditaddressPageModule)
  },
  {
    path: 'orderlist',
    loadChildren: () => import('./orderlist/orderlist.module').then( m => m.OrderlistPageModule)
  },
  {
    path: 'rating-review',
    loadChildren: () => import('./rating-review/rating-review.module').then( m => m.RatingReviewPageModule)
  },
  {
    path: 'rateproduct',
    loadChildren: () => import('./rateproduct/rateproduct.module').then( m => m.RateproductPageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
