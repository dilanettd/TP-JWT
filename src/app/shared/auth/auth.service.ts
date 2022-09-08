import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, of } from 'rxjs';
import { LoginModel } from 'src/app/auth/login-model';
import { TokenModel } from './token-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  public email!: string;
  jwtService: JwtHelperService = new JwtHelperService();

  userLogin(payload: LoginModel) {
    const formData = new FormData();
    formData.append('email', payload.email);
    formData.append('password', payload.password);
    return this.httpClient
      .post('http://localhost:8080/api/login', formData)
      .pipe(
        map((data) => {
          let token = data as TokenModel;
          localStorage.setItem('tokens', JSON.stringify(token));
          this.email = this.jwtService.decodeToken(token.access_token).sub;
          this.getUserByEmail(this.email);
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }

  getUserByEmail(email: string) {
    return this.httpClient
      .get(`http://localhost:8080/api/user/getByEmail/${email}`)
      .subscribe({
        next: (data) => {
          localStorage.setItem('userProfile', JSON.stringify(data));
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  refreshToken() {
    let refresh_token;
    let localStorageToken = localStorage.getItem('tokens');
        if (localStorageToken) {
      let tokens = JSON.parse(localStorageToken) as TokenModel;
      refresh_token = tokens.refresh_token;
        }

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refresh_token}`,
        });

        const requestOptions = { headers: headers };
    return this.httpClient.get<TokenModel>(
      'http://localhost:8080/api/token/refresh',
      requestOptions
    );
  }

  getAccessToken(): string {
    let localStorageToken = localStorage.getItem('tokens');
    if (localStorageToken) {
      let token = JSON.parse(localStorageToken) as TokenModel;
      let isTokenExpired = this.jwtService.isTokenExpired(token.access_token);
      if (isTokenExpired) {
        return '';
      }
      return token.access_token;
    }
    return '';
  }
}
