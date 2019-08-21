import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { ProjectService } from './project.service';

@Component({
  templateUrl: './add-project.component.html'
})
export class AddProjectComponent implements OnInit {
        
  constructor(private router: Router, private projectService: ProjectService) {
    
  }
    
    isDisabled = true;
    triggerSomeEvent() {
        this.isDisabled = !this.isDisabled;
        return;
    }
  
  projects: Project[];
  ngOnInit() {
    this.projectService.getProjects()
      .subscribe( data => {
        this.projects = data;
      });
    //this.project.startDate = new Date().toISOString().split('T')[0];
  };
    
  project: Project = new Project();
  createProject(): void {
    this.projectService.createProject(this.project)
        .subscribe( data => {
           this.projects = this.projects.concat(data);
           this.project = new Project();
        });

  };
    
  deleteProject(project: Project): void {
    this.projectService.deleteProject(project)
      .subscribe( data => {
        this.projects = this.projects.filter(u => u !== project);
      })
  };
    
  editProjectById(project: Project): void {
    this.projectService.getProjectById(project)
      .subscribe( data => {
        this.project = data;
      })
  };
  
  updateProject(project: Project): void {
    this.projectService.updateProject(project)
      .subscribe( data => {
        this.projects.forEach((t, i) => {
          if (t.projectId === data.projectId) { this.projects[i] = data; }
        });
          
        this.project = new Project();
      })
  };
    
  getProjectByFirstName(projectName: string): void {
    
    this.projectService.getProjects()
      .subscribe( data => {
        this.projects = data;
        this.projects.forEach((t, i) => {
          if (t.projectName === projectName) { this.projects = this.projects.filter(u => u == t); }
        })
      });
    
    
  };
    
  sortListByParameter(param: string): void {
    
      if (param === "firstName") {
       // this.projects = this.projects.sort((a,b)=>a.firstName.localeCompare(b.firstName));
      } else if (param === "lastName") {
       // this.projects = this.projects.sort((a,b)=>a.lastName.localeCompare(b.lastName));
      } else if (param === "employeeId") {
       // this.projects = this.projects.sort((a,b)=>a.employeeId.localeCompare(b.employeeId));
      } 
    
  };
    
}
