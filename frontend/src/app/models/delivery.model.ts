import {Package} from './package.model';

export interface Delivery {
  delivery_id: string;
  current_package: Package;
  pickup_time: Date;
  start_time: Date;
  end_time: Date;
  location: { lat: number, lng: number };
  status: string;
}
