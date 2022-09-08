import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import { UserProfile } from './shared/auth/user-profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  title = 'ang14-jwtauth';
  userProfile: any;

  ngOnInit(): void {
    if(localStorage.getItem('userProfile')){
      this.userProfile = localStorage.getItem('userProfile');
    }
  }
}
