import { Injectable , signal, effect } from '@angular/core';

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
      console.log("auth is called");
      this._auth.set(true);
    }
  }
}
