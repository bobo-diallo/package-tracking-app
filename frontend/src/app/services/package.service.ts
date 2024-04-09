import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../models/package.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private apiUrl = 'http://localhost:3000/api/package';

  constructor(private http: HttpClient) { }

  getAllPackages(): Observable<Package[]> {
    console.log('Getting all packages:::::');
    return this.http.get<Package[]>(`${this.apiUrl}`);
  }

  getPackageById(id: number): Observable<Package> {
    return this.http.get<Package>(`${this.apiUrl}/${id}`);
  }

  createPackage(packageData: Package): Observable<Package> {
    return this.http.post<Package>(`${this.apiUrl}`, packageData);
  }

  updatePackage(id: number, packageData: Package): Observable<Package> {
    return this.http.put<Package>(`${this.apiUrl}/${id}`, packageData);
  }

  deletePackage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
