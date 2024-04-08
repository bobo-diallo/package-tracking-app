import {Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {TrackerComponent} from './tracker/tracker.component';
import {DriverComponent} from './driver/driver.component';

export const routes: Routes = [
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {path: 'admin', component: AdminComponent},
  {path: 'tracker', component: TrackerComponent},
  {path: 'driver', component: DriverComponent},
];
