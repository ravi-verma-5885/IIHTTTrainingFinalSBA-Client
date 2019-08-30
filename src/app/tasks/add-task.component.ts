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
import { EditTaskService } from './edit-task.service';

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
        private parentTaskService: ParentTaskService,
        private editTaskService: EditTaskService) {

    }
    showErrEndDateBeforeStartDate = false;
    users: User[];
    projects: Project[];
    tasks: Task[];
    parentTasks: ParentTask [];
    
    userFirstName: string;
    selProjectName: string;
    selParentTaskName: string;
    parentTaskCheckbox: boolean;
    searchProjectToAddTask:any;
    isDisabledOnEdit = false;
    
    ngOnInit() {
        if(this.editTaskService.task != null){
            this.task = this.editTaskService.task;
            this.userFirstName = this.task.user.firstName + ' ' + this.editTaskService.task.user.lastName;
            this.selParentTaskName = this.task.parentTask.parentTask;
            this.selProjectName = this.editTaskService.project.projectName;
            this.task.project = this.editTaskService.project;
            this.isDisabledOnEdit = true;
        } else {
            this.setDefaultDate();
        }
    };
    
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
                    this.toggleDisableForParentTask();
                });
        } else {
            if(!this.processDateToShowError()) {
                this.task.status = "New";
                this.taskService.createTask(this.task)
                    .subscribe(data => {
                        this.clearForm();
                        alert('Task created successfully.');
                        this.setDefaultDate();
                    });
            }
         }
    };
    
    updateTask(task: Task): void {
        if(!this.processDateToShowError()) {
            this.taskService.createTask(task)
                .subscribe(data => {
                    this.clearForm();
                    this.task = new Task();
                    this.selProjectName = null;
                    this.selParentTaskName = null;
                    this.userFirstName = null;
                    this.isDisabledOnEdit = false;
                    alert('Task updated successfully.');
                      this.setDefaultDate();
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
        if (this.isDisabledForParentTask){
            this.setDefaultDate();
        } else {
            this.task.startDate = null;
            this.task.endDate = null;
        }
        
        this.isDisabledForParentTask = !this.isDisabledForParentTask;
        return;
    }
    
    callReset() {
        if (this.parentTaskCheckbox){
            this.toggleDisableForParentTask();
        }
    }
    
    setDefaultDate() {
        this.task.startDate = new Date().toISOString().split('T')[0];
        this.task.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
    }
    
    hideErrorMsg(){
        this.showErrEndDateBeforeStartDate = false;
    }
    
    checkEndDateIsBeforeStartDate(startDateVal: string, endDateVal: string) {
        if (Date.parse(endDateVal) < Date.parse(startDateVal)) {
            return true;
        } else {
            return false;
        }
    };
    
    processDateToShowError(){
        if(this.checkEndDateIsBeforeStartDate(this.task.startDate, this.task.endDate)){
            this.showErrEndDateBeforeStartDate = true;
            return true;
        } else {
            this.showErrEndDateBeforeStartDate = false;
            return false;
        }
    }
}
