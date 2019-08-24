import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ParentTask } from '../models/parentTask.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ParentTaskService {

  constructor(private http:HttpClient) {}

  private parentTaskUrl = 'http://localhost:8044/parentTasks';

  public getParentTasks() {
    return this.http.get<ParentTask[]>(this.parentTaskUrl);
  }

  public createParentTask(parentTask) {
    return this.http.post<ParentTask>(this.parentTaskUrl, parentTask);
  }
    
  public getParentTaskById(parentTask) {
    return this.http.get<ParentTask>(this.parentTaskUrl + "/"+ parentTask.parentId);
  }

}