import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http:HttpClient) {}

  private userUrl = 'http://localhost:8044/users';

  public getUsers() {
    return this.http.get<User[]>(this.userUrl);
  }

  public deleteUser(user) {
    return this.http.delete(this.userUrl + "/"+ user.userId);
  }

  public createUser(user) {
    return this.http.post<User>(this.userUrl, user);
  }
    
  public getUserById(user) {
    return this.http.get<User>(this.userUrl + "/"+ user.userId);
  }

  public updateUser(user) {
    return this.http.put<User>(this.userUrl, user);
  }
}