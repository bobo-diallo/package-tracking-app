import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { routes } from './app.routes';
import {FormsModule} from '@angular/forms';
import {TrackerComponent} from './tracker/tracker.component';
import {DriverComponent} from './driver/driver.component';
import {AdminComponent} from './admin/admin.component';
import {PackageDetailsComponent} from './package-details/package-details.component';
import {DeliveryDetailsComponent} from './delivery-details/delivery-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackerComponent,
    DriverComponent,
    AdminComponent,
    PackageDetailsComponent,
    DeliveryDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
