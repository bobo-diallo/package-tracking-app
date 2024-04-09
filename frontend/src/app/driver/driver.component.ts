import {Component, OnInit} from '@angular/core';
import {Delivery} from '../models/delivery.model';
import {WebSocketService} from '../services/websocket.service';
import {DeliveryService} from '../services/delivery.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements OnInit {
  deliveryDetails: Delivery | null;
  searchDeliveryId: any;

  constructor(
    private deliveryService: DeliveryService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit() {
    // Delivery update listener
    this.webSocketService.listen('delivery_updated').subscribe((deliveryUpdate: any) => {
      console.log('Delivery update received from websocket', deliveryUpdate.delivery.data);
      // @ts-ignore
      this.deliveryDetails = deliveryUpdate.delivery.data;
    });
  }

  findDelivery() {
    this.deliveryService.getDeliveryById(this.searchDeliveryId).subscribe({
      next: (data: Delivery) => {
        this.deliveryDetails = data;
        console.log('Delivery details fetched successfully', this.deliveryDetails);
      },
      error: (error) => {
        console.log('Error fetching delivery details');
        this.deliveryDetails = null;
        console.log(error);
      }
    });
  }

}
