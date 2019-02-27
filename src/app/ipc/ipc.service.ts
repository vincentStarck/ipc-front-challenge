import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPC } from './model/IPC';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class IpcService {

  urlFinal = 'https://ipc-backend.firebaseio.com/resultObj.json';
  constructor(public http: HttpClient, private authService: AuthService) { }


  /**
   * Gets history ipc
   * @returns history ipc arrays
   */
  getHistoryIPC(): Observable<IPC[]> {
    const token = this.authService.getToken();
    return this.http.get<IPC[]>(this.urlFinal + '?auth=' + token);
  }
}
