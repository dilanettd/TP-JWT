import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

getAllUser(){
  return this.httpClient.get('http://localhost:8080/api/user/getAll');
}

}
