import { Component } from '@angular/core';
import {PackageService} from './services/package.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private packageService: PackageService
  ) {
  }

  ngOnInit() {
    this.packageService.getAllPackages().subscribe(data => {
      console.log('All packages:::::', data);
    });
  }
}