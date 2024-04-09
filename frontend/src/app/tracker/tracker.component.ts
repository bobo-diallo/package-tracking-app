import {Component, OnInit} from '@angular/core';
import {Package} from '../models/package.model';
import {PackageService} from '../services/package.service';
import {WebSocketService} from '../services/websocket.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent implements OnInit{
  packageDetails: Package | null;
  searchPackageId: any;

  constructor(
    private packageService: PackageService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit() {
    // Delivery update listener
    this.webSocketService.listen('delivery_updated').subscribe((deliveryUpdate: any) => {
      console.log('Delivery update received from websocket', deliveryUpdate.delivery.data);
      // @ts-ignore
      this.packageDetails.active_delivery = deliveryUpdate.delivery.data;
    });

  }

  trackPackage() {
    this.packageService.getPackageById(this.searchPackageId).subscribe({
      next: (data: Package) => {
        this.packageDetails = data;
        console.log('Package details fetched successfully', this.packageDetails);
      },
      error: (error) => {
        console.log('Error fetching package details');
        this.packageDetails = null;
        console.log(error);
      }
    });
  }
}
