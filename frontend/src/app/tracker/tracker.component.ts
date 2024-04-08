import { Component } from '@angular/core';
import {Package} from '../models/package.model';
import {PackageService} from '../services/package.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent {
  packageDetails: any = null;
  searchPackageId: any;

  constructor(private packageService: PackageService) { }
  trackPackage() {
    console.log('Tracking package with id: ' + this.searchPackageId);
    this.packageService.getPackageById(this.searchPackageId).subscribe({
      next: (data: Package) => {
        this.packageDetails = data;
        console.log('Package details fetched successfully', this.packageDetails);
      },
      error: (error) => {
        console.log('Error fetching package details');
        console.log(error);
      }
    });
  }
}
