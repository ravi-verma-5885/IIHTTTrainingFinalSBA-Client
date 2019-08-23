import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';
import { Task } from '../models/task.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TaskService {

  constructor(private http:HttpClient) {}

  private taskUrl = 'http://localhost:8044/tasks';

  public getTasks() {
    return this.http.get<Task[]>(this.taskUrl);
  }

  public deleteTask(task) {
    return this.http.delete(this.taskUrl + "/"+ task.taskId);
  }

  public createTask(task) {
    return this.http.post<Task>(this.taskUrl, task);
  }
    
  public getTaskById(task) {
    return this.http.get<Task>(this.taskUrl + "/"+ task.taskId);
  }

  public updateTask(task) {
    return this.http.put<Task>(this.taskUrl, task);
  }
}