import { Injectable , signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrimaryService {
  _auth = signal(false);

  constructor() {
   }

  get auth() {
    return () => this._auth();
  }

  login(password: string | null) {
    if (password === '123') {
      this._auth.set(true);
    }
  }
}
