import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnnouncementComponent } from './dashboard/announcement/announcement.component';
import { PersonalComponent } from './dashboard/personal/personal.component';
import { PublicTrendingComponent } from './dashboard/public/public-trending/public-trending.component';
import { PublicBloodlineComponent } from './dashboard/public/public-bloodline/public-bloodline.component';
import { PublicAllComponent } from './dashboard/public/public-all/public-all.component';
import { MySavesService } from './services/my-saves.service';
import { AllSavesService } from './services/all-saves.service';
import { BloodSaveService } from './services/blood-save.service';
import { TrendSavesService } from './services/trend-saves.service';
import { UploadSaveService } from './services/upload-save.service';
import { ShortenPipe } from './services/shorten.pipe';
import { PublicComponent } from './dashboard/public/public.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AnnouncementComponent,
    PersonalComponent,
    PublicTrendingComponent,
    PublicBloodlineComponent,
    PublicAllComponent,
    ShortenPipe,
    PublicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MySavesService, AllSavesService, BloodSaveService, TrendSavesService, UploadSaveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
