import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../types/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockServerService {

  constructor(private http:HttpClient) { }

  fetchUsers() : Observable<User[]>{
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  addUsers(userData: User){
    return this.http.post('https://jsonplaceholder.typicode.com/users',userData);
  }

  deleteUser(id:number){
    return this.http.delete('https://jsonplaceholder.typicode.com/users/'+id);
  }

  updateUser(payload: User, id:number){
    return this.http.put('https://jsonplaceholder.typicode.com/users/'+id, payload);
  }
}
