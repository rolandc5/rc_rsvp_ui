import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor(private http: HttpClient) {}
  
  getInviteInfo(name: string) {
    return this.http.get(`https://api.rccanuto.com/?name=${name}`);
  }

  postInviteInfo(data: any) {
    // return this.http.post('https://api.rccanuto.com/update', data); 
    return this.http.post('https://api.rccanuto.com/update', data);
  }
}
