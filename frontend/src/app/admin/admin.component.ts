import {Component, Input, OnInit} from '@angular/core';
import {Delivery} from '../models/delivery.model';
import {Package} from '../models/package.model';
import {DeliveryService} from '../services/delivery.service';
import {PackageService} from '../services/package.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  @Input() deliveries: Delivery[];
  @Input() packages: Package[];

  constructor(
    private deliveryService: DeliveryService,
    private packageService: PackageService
  ) {
  }

  ngOnInit() {
    this.deliveryService.getAllDeliveries().subscribe({
        next: (deliveries: Delivery[]) => {
          this.deliveries = deliveries;
        },
        error: (error) => {
          console.log('Error fetching deliveries');
          console.log(error);
        }
      }
    )

    this.packageService.getAllPackages().subscribe({
      next: (packages: Package[]) => {
        this.packages = packages;
      },
      error: (error) => {
        console.log('Error fetching packages');
        console.log(error);
      }
    })
  }
}
