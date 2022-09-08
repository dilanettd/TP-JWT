import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
userList!: any[]
  constructor(private userService: UserService) { }

  ngOnInit(): void {
      console.log('ngOnInit');
this.userService.getAllUser().subscribe({
  next : (users) => {console.log(users)},
  error : (error) => console.error(error)
})
  }

}
