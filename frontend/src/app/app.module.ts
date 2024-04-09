import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { routes } from './app.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TrackerComponent} from './tracker/tracker.component';
import {DriverComponent} from './driver/driver.component';
import {AdminComponent} from './admin/admin.component';
import {PackageDetailsComponent} from './package-details/package-details.component';
import {DeliveryDetailsComponent} from './delivery-details/delivery-details.component';
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import {CreateDeliveryComponent} from './admin/create-delivery/create-delivery.component';
import {CreatePackageComponent} from './admin/create-package/create-package.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    TrackerComponent,
    DriverComponent,
    AdminComponent,
    PackageDetailsComponent,
    DeliveryDetailsComponent,
    AdminHomeComponent,
    CreateDeliveryComponent,
    CreatePackageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
