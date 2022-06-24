import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  SESSION_KEY = 'username'

	username: String;
	password: String;

	constructor(private http: HttpClient) {}

  authenticate(username, password) {
    console.log(username);
    console.log(password);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<User>('http://localhost:8080/user/validateLogin', { headers }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          let authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('basicauth', authString);
          return userData;
        }
      )

    );
  }

  isUserLoggedin() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('basicauth');
  }

  getLoggedinUser() {
		let user = sessionStorage.getItem(this.SESSION_KEY);
		if (user === null) return ''
		return user
	}

  registerInSession(username, password) {
		sessionStorage.setItem(this.SESSION_KEY, username);
	}
  

}
