import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnnouncementComponent } from './dashboard/announcement/announcement.component';
import { PersonalComponent } from './dashboard/personal/personal.component';
import { PublicTrendingComponent } from './dashboard/public-trending/public-trending.component';
import { PublicBloodlineComponent } from './dashboard/public-bloodline/public-bloodline.component';
import { PublicAllComponent } from './dashboard/public-all/public-all.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AnnouncementComponent,
    PersonalComponent,
    PublicTrendingComponent,
    PublicBloodlineComponent,
    PublicAllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
