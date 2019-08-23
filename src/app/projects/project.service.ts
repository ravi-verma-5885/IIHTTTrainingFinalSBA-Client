import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Project } from '../models/project.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProjectService {

  constructor(private http:HttpClient) {}

  private projectUrl = 'http://localhost:8044/projects';

  public getProjects() {
    return this.http.get<Project[]>(this.projectUrl);
  }

  public deleteProject(project) {
    return this.http.delete(this.projectUrl + "/"+ project.projectId);
  }

  public createProject(project) {
    return this.http.post<Project>(this.projectUrl, project);
  }
    
  public getProjectById(project) {
    return this.http.get<Project>(this.projectUrl + "/"+ project.projectId);
  }

  public updateProject(project) {
    return this.http.put<Project>(this.projectUrl, project);
  }
}