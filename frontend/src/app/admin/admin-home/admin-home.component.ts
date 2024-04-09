import {Component, Input} from '@angular/core';
import {Delivery} from '../../models/delivery.model';
import {Package} from '../../models/package.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  @Input() deliveries: Delivery[];
  @Input() packages: Package[];

  constructor(private router: Router) {}

  createPackage(): void {
    this.router.navigate(['/create-package']);
  }

  createDelivery(): void {
    this.router.navigate(['/create-delivery']);
  }
}
