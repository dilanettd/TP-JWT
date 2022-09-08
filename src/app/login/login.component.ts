import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { LoginModel } from '../auth/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  loginForm: LoginModel = {
    email: '',
    password: '',
  };

  ngOnInit(): void {}

  userLogin() {
    this.authService.userLogin(this.loginForm).subscribe((data) => {
            console.log('data', data);
      
    });
  }
}
