import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainWrapperComponent } from './main_page/main-wrapper/main-wrapper.component';
import { RentalsWrapperComponent } from './rentals_page/rentals-wrapper/rentals-wrapper.component';
import { HousingWrapperComponent } from './housing_page/housing-wrapper/housing-wrapper.component';
import { PaymentPageComponent } from './payment/payment-page/payment-page.component';
import { PaymentSuccessComponent } from './payment/payment-success/payment-success.component';

const routes: Routes = [
  { path: '', component: MainWrapperComponent},
  { path: 'rentals', component: RentalsWrapperComponent},
  { path: 'housing/:id', component: HousingWrapperComponent},
  { path: 'payment', component: PaymentPageComponent},
  { path: 'payment/:status', component: PaymentSuccessComponent},
  // { path: '**', component: Error404Component},
  // { path: 'payment/:status', component: AuthenticationComponent, children: [
  //   { path: 'rentals', component: RentalsWrapperComponent},
  //   { path: 'housing/:id', component: HousingWrapperComponent},
  //   { path: 'payment', component: PaymentPageComponent},
  //   { path: 'payment/:status', component: PaymentSuccessComponent},
  // ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
