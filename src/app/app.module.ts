import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './common/components/header/header.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { MainWrapperComponent } from './main_page/main-wrapper/main-wrapper.component';
import { MainSearchComponent } from './main_page/main-search/main-search.component';
import { MainSectionsComponent } from './main_page/main-sections/main-sections.component';
import { RentalsWrapperComponent } from './rentals_page/rentals-wrapper/rentals-wrapper.component';
import { HousingCardComponent } from './rentals_page/housing-card/housing-card.component';
import { RentalsAsideComponent } from './rentals_page/rentals-aside/rentals-aside.component';
import { HousingWrapperComponent } from './housing_page/housing-wrapper/housing-wrapper.component';
import { HousingAsideComponent } from './housing_page/housing-aside/housing-aside.component';
import { HousingMainComponent } from './housing_page/housing-main/housing-main.component';
import { PaymentPageComponent } from './payment/payment-page/payment-page.component';
import { PaymentSuccessComponent } from './payment/payment-page/payment-success/payment-success.component';
import { StarRatingComponent } from './common/components/star-rating/star-rating.component';
import { PersonalAreaComponent } from './personal_area/personal-area/personal-area.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { UsersService } from './common/services/users.service';
import { AuthenticationService } from './common/services/authentication.service';
import { HousingService } from './common/services/housing.service';
import { CarouselComponent } from './common/components/carousel/carousel.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { ReservationsComponent } from './client/reservations/reservations.component';
import { ReviewComponent } from './client/review/review.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LandlordInfoComponent } from './admin/landlord-info/landlord-info.component';
import { CreateVacancyComponent } from './landlord/create-vacancy/create-vacancy.component';
import { RequestsComponent } from './landlord/requests/requests.component';
import { VacanciesComponent } from './landlord/vacancies/vacancies.component';
import { ViewedVacanciesComponent } from './admin/dashboard/viewed-vacancies/viewed-vacancies.component';
import { NewVacanciesComponent } from './admin/dashboard/new-vacancies/new-vacancies.component';
import { LandlordVacanciesComponent } from './admin/landlord-info/landlord-vacancies/landlord-vacancies.component';
import { ReservationCardComponent } from './client/reservations/reservation-card/reservation-card.component';
import { VacancyCardComponent } from './landlord/vacancies/vacancy-card/vacancy-card.component';
import { NewRequestComponent } from './landlord/requests/new-request/new-request.component';
import { ViewedRequestComponent } from './landlord/requests/viewed-request/viewed-request.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StarRatingComponent,
    MainWrapperComponent,
    MainSearchComponent,
    MainSectionsComponent,
    RentalsWrapperComponent,
    HousingCardComponent,
    RentalsAsideComponent,
    HousingAsideComponent,
    HousingMainComponent,
    HousingWrapperComponent,
    PaymentPageComponent,
    PaymentSuccessComponent,
    PersonalAreaComponent,
    AuthenticationComponent,
    CarouselComponent,
    InfoPageComponent,
    ReservationsComponent,
    ReviewComponent,
    DashboardComponent,
    LandlordInfoComponent,
    CreateVacancyComponent,
    RequestsComponent,
    VacanciesComponent,
    ViewedVacanciesComponent,
    NewVacanciesComponent,
    LandlordVacanciesComponent,
    ReservationCardComponent,
    VacancyCardComponent,
    NewRequestComponent,
    ViewedRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [UsersService, AuthenticationService, HousingService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
