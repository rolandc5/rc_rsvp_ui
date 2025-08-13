import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Rsvp } from '../models/rsvp';


@Injectable({
  providedIn: 'root'
})
export class SheetsService {
  _rsvp = signal({} as Rsvp)

  constructor(private http: HttpClient) {
  }

  get rsvp() {
    return this._rsvp();
  }
  
  getInviteInfo(name: string) {
    return this.http.get<Rsvp>(`${environment.API_URL}/?name=${name}`).pipe(map(response => {
      this._rsvp.set(response);
    }));
  }

  postInviteInfo() {
    return this.http.post(`${environment.API_URL}/update`, this.rsvp);
  }

}
