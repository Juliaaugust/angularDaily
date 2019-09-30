import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

export class AuthenticationService {

  constructor() { }

  private isAuthenticated = false;

  readonly onChange = new ReplaySubject(1);
    watchStatus(): Observable<any> {

  return this.onChange
    .pipe(map(x => {
      return this.isAuthenticated;
    }));
  }

  login() {
    this.isAuthenticated = true;
    this.onChange.next(true);
  }

  logout() {
    this.isAuthenticated = false;
    window.localStorage.clear();
    this.onChange.next(false);
  }

  // private isAuthenticated = false;

  // login() {
  //   this.isAuthenticated = true;
  // }
  // logout() {
  //   this.isAuthenticated = false;
  //   window.localStorage.clear();
  // }

  // isLoggedIn(): boolean {
  //   return this.isAuthenticated;
  // }

  // status(): Observable<any> {

  //   return this.http.get(url)
  //     .pipe(map((data: any) => {
  //       const json = data;
  //       /// тут может быть парсинг
  //       return json;
  //     }));
  // }

}
