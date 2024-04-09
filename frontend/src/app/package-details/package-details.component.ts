import {Component, Input, OnInit} from '@angular/core';
import {Package} from '../models/package.model';
import {DatePipe} from '@angular/common';
import * as L from 'leaflet';


@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrl: './package-details.component.css'
})
export class PackageDetailsComponent implements OnInit {
  @Input() packageDetails: Package;


  ngOnInit() {
    if (this.packageDetails && this.packageDetails.active_delivery) {
      const {lat, lng} = this.packageDetails.active_delivery.location;
      this.createMap(lat, lng);
    }
  }

  createMap(lat: number, lng: number) {
    const map = L.map('map').setView([lat, lng], 13);
    L.marker([lat, lng]).addTo(map);
  }

}
