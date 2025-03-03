import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor(private http: HttpClient) { }

  
  getInviteInfo(name: string) {
    return this.http.get(`http://localhost:8080/?name=${name}`);
  }
}
