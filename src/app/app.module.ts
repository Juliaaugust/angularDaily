import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainSearchComponent } from './main_page/main-search/main-search.component';
import { AdvantagesComponent } from './main_page/advantages/advantages.component';
import { RecommendsComponent } from './main_page/recommends/recommends.component';
import { ContactsComponent } from './main_page/contacts/contacts.component';
import { MainPageWrapperComponent } from './main_page/main-page-wrapper/main-page-wrapper.component';
import { MainSectionsComponent } from './main_page/main-sections/main-sections.component';
import { HousingCardComponent } from './rentals_page/housing-card/housing-card.component';
import { RentalsWrapperComponent } from './rentals_page/rentals-wrapper/rentals-wrapper.component';
import { RentalsAsideComponent } from './rentals_page/rentals-aside/rentals-aside.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainSearchComponent,
    AdvantagesComponent,
    RecommendsComponent,
    ContactsComponent,
    MainPageWrapperComponent,
    MainSectionsComponent,
    HousingCardComponent,
    RentalsWrapperComponent,
    RentalsAsideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
