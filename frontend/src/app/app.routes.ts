import {Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {TrackerComponent} from './tracker/tracker.component';
import {DriverComponent} from './driver/driver.component';
import {CreatePackageComponent} from './admin/create-package/create-package.component';
import {CreateDeliveryComponent} from './admin/create-delivery/create-delivery.component';

export const routes: Routes = [
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {path: 'admin', component: AdminComponent},
  {path: 'tracker', component: TrackerComponent},
  {path: 'driver', component: DriverComponent},
  {path: 'create-package', component: CreatePackageComponent},
  {path: 'create-delivery', component: CreateDeliveryComponent},
];
