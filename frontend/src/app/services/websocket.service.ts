import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080');

    this.socket$.subscribe({
        next: (message) => {
          console.log('Received message from server:', message);
        },
        error: (error) => {
          console.error('WebSocket error:', error)
        }
      }
    );
  }

  /**
   *
   * @param eventName
   */
  listen(eventName: string) {
    console.log('Listening to event:', eventName);
    return this.socket$.asObservable().pipe(
      filter((message) => message.event === eventName)
    );
  }
}
