import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
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
import { PaymentSuccessComponent } from './payment/payment-success/payment-success.component';

import { StarRatingComponent } from './optional_components/star-rating/star-rating.component';
import { CarouselComponent } from './optional_components/carousel/carousel.component';
import { PersonalAreaComponent } from './personal_area/personal-area/personal-area.component';
import { AuthenticationComponent } from './authentication/authentication.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
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
    StarRatingComponent,
    CarouselComponent,
    PersonalAreaComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
