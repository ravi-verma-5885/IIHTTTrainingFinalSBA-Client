import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { Task } from '../models/task.model';
import { ParentTask } from '../models/parentTask.model';

import { UserService } from '../user/user.service';
import { ProjectService } from '../projects/project.service';
import { TaskService } from './task.service';
import { ParentTaskService } from './parentTask.service';

import { ModalService } from '../_modal';

@Component({
    templateUrl: './view-task.component.html'
})
export class ViewTaskComponent implements OnInit {

    constructor(private router: Router,
        private userService: UserService,
        private projectService: ProjectService,
        private modalService: ModalService,
        private taskService: TaskService) {

    }

    users: User[];
    projects: Project[];
    tasks: Task[];

    ngOnInit() {
        
    };
    
    getProjectByName(projectName: string): void {
        this.projectService.getProjects()
            .subscribe(data => {
                this.projects = data;
                this.projects.forEach((t, i) => {
                    if (t.projectName === projectName) {
                        this.projects = this.projects.filter(u => u == t);
                    }
                });
                this.tasks = this.projects[0].tasks;
            });
    };
    
    sortListByParameter(param: string): void {
        if (param === "startDate") {
            this.tasks = this.tasks.sort((a, b) => a.startDate.localeCompare(b.startDate));
        } else if (param === "endDate") {
            this.tasks = this.tasks.sort((a, b) => a.endDate.localeCompare(b.endDate));
        } else if (param === "priority") {
            this.tasks = this.tasks.sort((a, b) => a.priority - b.priority);
        } else if (param === "completed") {
            this.tasks = this.tasks.sort((a, b) => a.status.localeCompare(b.status));
        }

    };
    
    updateTaskCompleted(task: Task, status: string): void {
        task.status = status;
        this.taskService.updateTask(task)
            .subscribe(data => {
                alert('Task updated successfully with status complete.');
                this.tasks.forEach((t, i) => {
                    if (t.taskId === data.taskId) {
                        this.tasks[i].status = status;
                    }
                });
        })
    };
    

}
