import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Package} from '../../models/package.model';
import {PackageService} from '../../services/package.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrl: './create-package.component.css'
})
export class CreatePackageComponent implements OnInit {
  packageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private packageService: PackageService,
    private router: Router,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.packageForm = this.formBuilder.group({
      description: ['', Validators.required],
      weight: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      depth: ['', Validators.required],
      from_name: ['', Validators.required],
      from_address: ['', Validators.required],
      from_location: this.formBuilder.group({
        lat: ['', Validators.required],
        lng: ['', Validators.required]
      }),
      to_name: ['', Validators.required],
      to_address: ['', Validators.required],
      to_location: this.formBuilder.group({
        lat: ['', Validators.required],
        lng: ['', Validators.required]
      })
    });
  }

  onSubmit(): void {
    if (this.packageForm.valid) {
      const packageData: Package = this.packageForm.value;
      this.packageService.createPackage(packageData).subscribe({
        next: (newPackge) => {
          this.toastService.success('Package created successfully', 'Success');
          this.router.navigate(['/admin'])
        },
        error: (error) => {
          this.toastService.error('An error occurred while creating the package', 'Error');
          console.log('Error package creation', error);
        }
      })
      console.log('Package Data:', packageData);
    }
  }
}
