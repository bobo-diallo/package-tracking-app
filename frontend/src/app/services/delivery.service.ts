import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Package} from '../models/package.model';
import {Delivery} from '../models/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = 'http://localhost:3000/api/delivery';

  constructor(private http: HttpClient) {
  }

  getAllDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.apiUrl}`);
  }

  getDeliveryById(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/${id}`);
  }

  createDelivery(packageData: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(`${this.apiUrl}`, packageData);
  }

  updateDelivery(id: number, packageData: Delivery): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.apiUrl}/${id}`, packageData);
  }

  deleteDelivery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
