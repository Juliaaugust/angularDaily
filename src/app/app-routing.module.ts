import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainWrapperComponent } from './main_page/main-wrapper/main-wrapper.component';
import { RentalsWrapperComponent } from './rentals_page/rentals-wrapper/rentals-wrapper.component';
import { HousingWrapperComponent } from './housing_page/housing-wrapper/housing-wrapper.component';
import { PaymentPageComponent } from './payment/payment-page/payment-page.component';
import { PaymentSuccessComponent } from './payment/payment-page/payment-success/payment-success.component';
import { PersonalAreaComponent } from './personal_area/personal-area/personal-area.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ReservationsComponent } from './client/reservations/reservations.component';
import { ReviewComponent } from './client/review/review.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LandlordInfoComponent } from './admin/landlord-info/landlord-info.component';
import { CreateVacancyComponent } from './landlord/create-vacancy/create-vacancy.component';
import { RequestsComponent } from './landlord/requests/requests.component';
import { VacanciesComponent } from './landlord/vacancies/vacancies.component';
import { InfoPageComponent } from './info-page/info-page.component';

const routes: Routes = [
  { path: '', component: MainWrapperComponent},
  // { path: '**', redirectTo: '/', pathMatch: 'full'},
  { path: 'info', component: InfoPageComponent},
  { path: 'rentals', component: RentalsWrapperComponent},
  { path: 'housing/:id', component: HousingWrapperComponent},
  { path: 'payment/:id', component: PaymentPageComponent},
  { path: 'payment/:id/:status', component: PaymentSuccessComponent},

  { path: 'authentication', component: AuthenticationComponent},

  { path: 'client', component: PersonalAreaComponent},
  { path: 'client/area/:id', component: PersonalAreaComponent},
  { path: 'client/reservaions', component: ReservationsComponent},
  { path: 'client/review/:id', component: ReviewComponent},

  { path: 'admin', component: PersonalAreaComponent},
  { path: 'admin/area/:id', component: PersonalAreaComponent},
  { path: 'admin/dashboard', component: DashboardComponent},
  { path: 'admin/landlord/:id', component: LandlordInfoComponent},
  { path: 'admin/reservaions', component: ReservationsComponent},
  { path: 'admin/review/:id', component: ReviewComponent},

  { path: 'landlord', component: PersonalAreaComponent},
  { path: 'landlord/area/:id', component: PersonalAreaComponent},
  { path: 'landlord/create', component: CreateVacancyComponent},
  { path: 'landlord/requests', component: RequestsComponent},
  { path: 'landlord/vacancies', component: VacanciesComponent},
  { path: 'landlord/reservaions', component: ReservationsComponent},
  { path: 'landlord/review/:id', component: ReviewComponent},

  // { path: '**', component: MainWrapperComponent}

  // { path: 'client', component: PersonalAreaComponent, children: [
  //   { path: '', redirectTo: 'area/:id', pathMatch: 'full'},
  //   // { path: '**', redirectTo: 'area/8', pathMatch: 'full'},
  //   { path: 'area/:id', component: PersonalAreaComponent},
  //   { path: 'reservaions', component: ReservationsComponent},
  //   { path: 'review/:id', component: ReviewComponent}
  // ]},

  // { path: 'admin', component: PersonalAreaComponent, children: [
  //   // { path: '', redirectTo: 'area/8', pathMatch: 'full'},
  //   { path: 'area/:id', component: PersonalAreaComponent},
  //   { path: 'dashboard', component: DashboardComponent},
  //   { path: 'landlord/:id', component: LandlordInfoComponent}
  // ]},

  // { path: 'landlord', component: PersonalAreaComponent, children: [
  //   // { path: '', redirectTo: 'area/8', pathMatch: 'full'},
  //   { path: 'area/:id', component: PersonalAreaComponent},
  //   { path: 'create', component: CreateVacancyComponent},
  //   { path: 'requests', component: RequestsComponent},
  //   { path: 'vacamcies', component: VacanciesComponent}
  // ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
