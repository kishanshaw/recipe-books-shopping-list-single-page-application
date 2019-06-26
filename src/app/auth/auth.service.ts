import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError,  BehaviorSubject} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';


export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private errorMessage: any;
  userSubject = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) { }

  onSignUp(emailInput: string, passwordInput: string) {
    return this.http.post<AuthResponse>
    ('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAq-gfXRYSGXBZxIte3PUz9MVVmEv9d_z8',
      {
        email: emailInput,
        password: passwordInput,
        returnSecureToken: true
      })
      .pipe(catchError(
         error => {
           if (!error.error || !error.error.error) {
                  return throwError('An Unknown error occurred');
           }
           this.errorMessage = error.error.error.message;
           switch (this.errorMessage) {
            case 'EMAIL_EXISTS':
              this.errorMessage = 'This email already exists in our database';
          }
           return throwError(this.errorMessage);
        }
      ), tap(
        response => {
              this.handleAuthentcation(response.email, response.localId, response.idToken, +response.expiresIn);
        }
        )
      );
  }

  onLogin(emailInput: string, passwordInput: string) {
    return this.http.post<AuthResponse>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
      {
        email: emailInput,
        password: passwordInput,
        returnSecureToken: true
      })
      .pipe(catchError(
        error => {
          if (!error.error || !error.error.error) {
            return throwError('An Unknown error occurred');
          }
          this.errorMessage = error.error.error.message;
          switch (this.errorMessage) {
            case 'INVALID_PASSWORD':
              this.errorMessage = 'Please enter correct email/password';
              break;
            case 'EMAIL_NOT_FOUND':
              this.errorMessage = 'Please enter correct email if you are already registered';
              break;
            case 'USER_DISABLED':
              this.errorMessage = 'Your account has been locked due to multiple incorrect login attempts. Please try after 24 hours';
              break;
          }
          return throwError(this.errorMessage);
        }
      ), tap(
        response => {
          this.handleAuthentcation(response.email, response.localId, response.idToken, +response.expiresIn);
        }
      ) );
  }

  private handleAuthentcation(email: string, userId: string, token: string, expiresIn: number ) {
    const expirationDate =  new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.userSubject.next(user);
    this.onAutoLogout(expiresIn*1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  onLogout() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  onAutoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationData: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationData));

    if (loadedUser.token) {
      this.userSubject.next(loadedUser);
      const expirationTimeLeft = new Date(userData._tokenExpirationData).getTime() - new Date().getTime();
      this.onAutoLogout(expirationTimeLeft);
    }

  }

  onAutoLogout(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.onLogout();
    }, expirationTime);
  }
}
