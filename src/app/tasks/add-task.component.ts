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
    templateUrl: './add-task.component.html'
})
export class AddTaskComponent implements OnInit {

    constructor(private router: Router,
        private userService: UserService,
        private projectService: ProjectService,
        private modalService: ModalService,
        private taskService: TaskService,
        private parentTaskService: ParentTaskService) {

    }

    users: User[];
    projects: Project[];
    tasks: Task[];
    parentTasks: ParentTask [];
    
    ngOnInit() {
        
    };
    
    userFirstName: string;
    selProjectName: string;
    selParentTaskName: string;
    parentTaskCheckbox: boolean;
    
    task: Task = new Task();
    parentTask: ParentTask;
    createTask(): void {
        if (this.parentTaskCheckbox){
            this.parentTask = new ParentTask();
            this.parentTask.parentTask = this.task.taskName;
            this.parentTask.project = this.task.project;
            this.parentTaskService.createParentTask(this.parentTask)
                .subscribe(data => {
                    this.clearForm();
                    alert('Parent Task created successfully.');
                });
        } else {
            this.task.status = "New";
            this.taskService.createTask(this.task)
                .subscribe(data => {
                    this.clearForm();
                    alert('Task created successfully.');
                });
         }
    };
    
    clearForm() {
        this.task = new Task();
        this.selProjectName = null;
        this.selParentTaskName = null;
        this.userFirstName = null;
        this.callReset();
        this.parentTaskCheckbox = false;
    };

    updateTask(task: Task): void {
        this.taskService.updateTask(task)
            .subscribe(data => {
                this.task = new Task();
                this.selProjectName = null;
                this.selParentTaskName = null;
                this.userFirstName = null;
                alert('Task updated successfully.');
            })
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
            });
    };
    
    getUserByFirstName(firstName: string): void {
        this.userService.getUsers()
            .subscribe(data => {
                this.users = data;
                this.users.forEach((t, i) => {
                    if (t.firstName === firstName) { this.users = this.users.filter(u => u == t); }
                })
            });
    };
    
    getParentTaskByName(parentTaskName: string): void {
        this.parentTaskService.getParentTasks()
            .subscribe(data => {
                this.parentTasks = data;
                this.parentTasks.forEach((t, i) => {
                    if (t.parentTask === parentTaskName) { this.parentTasks = this.parentTasks.filter(u => u == t); }
                })
            });
    };

    openModal(id: string) {
        if (id === "project-modal"){
            this.projectService.getProjects()
                .subscribe(data => {
                    this.projects = data;
                });
        } else if (id === "user-modal"){
            this.userService.getUsers()
                .subscribe(data => {
                    this.users = data;
                });
        } else if (id === "parent-task-modal"){
            this.parentTaskService.getParentTasks()
                .subscribe(data => {
                    this.parentTasks = data;
                });
        }
        this.modalService.open(id);
    };

    closeModal(id: string) {
        this.modalService.close(id);
    };

    selectUser(id: string, user: User) {
        this.task.user = user;
        this.userFirstName = this.task.user.firstName + ' ' + this.task.user.lastName;
        this.closeModal(id);
    };

    selectProject(id: string, project: Project) {
        this.task.project = project;
        this.selProjectName = this.task.project.projectName;
        this.closeModal(id);
    };
    
    selectParentTask(id: string, parentTaskFrmList: ParentTask) {
        this.task.parentTask = parentTaskFrmList;
        this.selParentTaskName = this.task.parentTask.parentTask;
        this.closeModal(id);
    };
    
    isDisabledForParentTask = false;
    toggleDisableForParentTask() {
        this.isDisabledForParentTask = !this.isDisabledForParentTask;
        return;
    }
    
    callReset() {
        if (this.parentTaskCheckbox){
            this.toggleDisableForParentTask();
        }
    }
}
