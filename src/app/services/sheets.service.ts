import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor(private http: HttpClient, private router: Router) {
  }
  
  getInviteInfo(name: string) {
    // return this.http.get(`https://api.rccanuto.com/?name=${name}`);
    return this.http.get(`${environment.API_URL}/?name=${name}`);
  }

  postInviteInfo(data: any) {
    // return this.http.post('https://api.rccanuto.com/update', data); 
    return this.http.post(`${environment.API_URL}/update`, data);
  }
}
