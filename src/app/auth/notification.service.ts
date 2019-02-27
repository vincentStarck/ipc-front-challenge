import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  urlFinal = '';
  constructor(private http: HttpClient) { }


  /**
   * Sends notification to admin 
   * @param email 
   */
  sendNotificationToAdmin(email: string) {
    console.log('Sending notificatin to admin...');
    this.http.post(this.urlFinal, { email: email }).subscribe(
      (data: any) => {
        console.log(data);
      },
      error => console.log(error)

    );

  }

}
