import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from './route/app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

import { FlowerService } from './services/flower.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [FlowerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
