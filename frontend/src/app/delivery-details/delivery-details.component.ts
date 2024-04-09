import {Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {Delivery} from '../models/delivery.model';
import {WebSocketService} from '../services/websocket.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrl: './delivery-details.component.css'
})
export class DeliveryDetailsComponent implements OnInit {
  @Input() deliveryDetails: Delivery;
  currentLocation: {lng: number, lat: number};
  map: L.Map;
  deliveryMarker: L.Marker;
  sourceMarker: L.Marker;
  destinationMarker: L.Marker;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.currentLocation = this.deliveryDetails.location;

    if (this.deliveryDetails) {
      this.createMap();
      this.startDeliveryLocationUpdate();
    }
  }

  /**
   * Get current location of the driver
   */
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLocation = {
          lng: position.coords.longitude,
          lat: position.coords.latitude
        };
        // this.currentLocation = {
        //   lng: 14.148614787474095,
        //   lat: -16.048635296627953
        // };
        this.updateMarkers(this.currentLocation);
        this.webSocketService.sendMessage('location_update', {
          delivery_id: this.deliveryDetails.delivery_id,
          location: this.currentLocation
        });
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  /**
   * Update status of the delivery
   */
  updateStatus(status: string): void {
    this.deliveryDetails.status = status;
    this.webSocketService.sendMessage('status_updated', {
      delivery_id: this.deliveryDetails.delivery_id,
      status: this.deliveryDetails.status
    });
  }

  /**
   * Create map with delivery location
   */
  private createMap() {
    this.map = L.map('deliveryMap').setView([this.currentLocation.lat, this.currentLocation.lng], 13);
    this.deliveryMarker = L.marker([this.currentLocation.lat, this.currentLocation.lng]).bindPopup('Delivery Location').addTo(this.map);
    if (this.deliveryDetails.current_package) {
      const fromLocation = this.deliveryDetails.current_package.from_location;
      const toLocation = this.deliveryDetails.current_package.to_location;
      this.sourceMarker = L.marker([fromLocation.lat, fromLocation.lng]).bindPopup('Source Location').addTo(this.map);
      this.destinationMarker = L.marker([toLocation.lat, toLocation.lng]).bindPopup('Destination Location').addTo(this.map);
    }
  }

  /**
   * Update position of the delivery
   */
  private startDeliveryLocationUpdate() {
    setInterval(() => {
      this.getCurrentLocation();
    }, 20000);
  }

  /**
   * Update current location marker on the map
   * @param currentLocation
   * @private
   */
  private updateMarkers(currentLocation: {lng: number, lat: number}) {
    if (this.map) {
      this.deliveryMarker.setLatLng([currentLocation.lat, currentLocation.lng]);
      this.map.setView([currentLocation.lat, currentLocation.lng], this.map.getZoom());
    }
  }
}
