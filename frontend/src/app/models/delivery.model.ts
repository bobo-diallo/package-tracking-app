export interface Delivery {
  delivery_id: string;
  pickup_time: Date;
  start_time: Date;
  end_time: Date;
  location: { lat: number, lng: number };
  status: 'open' | 'picked-up' | 'in-transit' | 'delivered' | 'failed';
}
