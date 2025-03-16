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
    if (password === 'mitzy&levi') {
      this._auth.set(true);
    }
  }
}
