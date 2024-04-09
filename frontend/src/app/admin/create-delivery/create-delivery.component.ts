import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PackageService} from '../../services/package.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Package} from '../../models/package.model';
import {DeliveryService} from '../../services/delivery.service';
import {Delivery} from '../../models/delivery.model';

@Component({
  selector: 'app-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrl: './create-delivery.component.css'
})
export class CreateDeliveryComponent {
  deliveryForm: FormGroup;
  packageList: Package[] = [];
  statusOptions: string[] = ['open', 'picked-up', 'in-transit', 'delivered', 'failed'];
  constructor(
    private formBuilder: FormBuilder,
    private packageService: PackageService,
    private deliveryService: DeliveryService,
    private router: Router,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPackages();

    this.deliveryForm = this.formBuilder.group({
      pickup_time: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      package_id: ['', Validators.required],
      status: ['', Validators.required],
      location: this.formBuilder.group({
        lat: ['', Validators.required],
        lng: ['', Validators.required]
      }),
    });
  }

  onSubmit(): void {
    if (this.deliveryForm.valid) {
      const deliveryData: any = this.deliveryForm.value;
      this.deliveryService.createDelivery(deliveryData).subscribe({
        next: () => {
          this.toastService.success('Delivery created successfully', 'Success');
          this.router.navigate(['/admin'])
        },
        error: (error) => {
          this.toastService.error('An error occurred while creating the delivery', 'Error');
          console.log('Error delivery creation', error);
        }
      })
      console.log('Package Data:', deliveryData);
    }
  }

  private getPackages(): void {
    this.packageService.getAllPackages().subscribe({
      next: (packages) => {
        console.log('packages::::', packages);
        this.packageList = packages.filter(p => p.active_delivery == null);
      },
      error: (error) => {
        console.log('Error fetching packages', error);
      }
    })
  }
}
