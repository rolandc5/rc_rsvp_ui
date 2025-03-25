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
    let auth = null;
    if (typeof window !== 'undefined') {
      auth = localStorage.getItem('auth');
    }
    if (password === 'mitzy&levi' || auth === 'true') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth', 'true');
        console.log(localStorage.getItem('auth'));
      }
      this._auth.set(true);
    }
  }
}
