import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule , MdNativeDateModule} from '@angular/material';

import { AppRoutingModule } from './route/app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { flowerComponent } from "./modules/flower/flower.component";
import { FlowerEditComponent } from "./modules/flower/flower.edit.component";
import { FlowerService } from './services/flower.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FlowerEditComponent,
    flowerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    MdNativeDateModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [FlowerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
