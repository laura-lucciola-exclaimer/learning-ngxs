import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../types/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://jsonplaceholder.typicode.com/users/';

  constructor(private http:HttpClient) { }

  fetchUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

  addUsers(userData: User): Observable<User>{
    return this.http.post<User>(this.url,userData);
  }

  deleteUser(id:number): Observable<Object>{
    return this.http.delete<Object>(this.url+id);
  }

  updateUser(payload: User, id:number): Observable<User>{
    return this.http.put<User>(this.url+id, payload);
  }
}
