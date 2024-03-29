import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { Project } from '../models/project.model';

import { ProjectService } from './project.service';
import { UserService } from '../user/user.service';

import { ModalService } from '../_modal';

declare var $: any;

@Component({
    templateUrl: './add-project.component.html'
})
export class AddProjectComponent implements OnInit {

    constructor(private router: Router, private projectService: ProjectService, private modalService: ModalService, private userService: UserService) {

    }
    showErrEndDateBeforeStartDate = false;
    isDisabled = true;
    triggerSomeEvent() {
        if(this.isDisabled){
            this.project.startDate = new Date().toISOString().split('T')[0];
            this.project.endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
        } else {
            this.project.startDate = null;
            this.project.endDate = null;
        }
        this.isDisabled = !this.isDisabled;
        return;
    }

    users: User[];
    projects: Project[];
    
    ngOnInit() {
        this.projectService.getProjects()
            .subscribe(data => {
                this.projects = data;
                this.projects.forEach((t, i) => {
                    this.projects[i].completed = this.checkEndDateIsPast(t.endDate);
                });
            });
    };

    project: Project = new Project();
    createProject(): void {
        
        if(!this.processDateToShowError()) {
            this.projectService.createProject(this.project)
                .subscribe(data => {
                    this.projects = this.projects.concat(data);
                    this.projects.forEach((t, i) => {
                        this.projects[i].completed = this.checkEndDateIsPast(t.endDate);
                    });
                    this.project = new Project();
                    this.userFirstName = null;
                });
        }
    };
    
    processDateToShowError(){
        if(!this.isDisabled){
            if(this.checkEndDateIsBeforeStartDate(this.project.startDate, this.project.endDate)){
                this.showErrEndDateBeforeStartDate = true;
                return true;
            } else {
                this.showErrEndDateBeforeStartDate = false;
                return false;
            }
        } else {
            this.showErrEndDateBeforeStartDate = false;
            return false;
        }
    }

    deleteProject(project: Project): void {
        this.projectService.deleteProject(project)
            .subscribe(data => {
                this.projects = this.projects.filter(u => u !== project);
            })
    };

    editProjectById(project: Project): void {
        this.projectService.getProjectById(project)
            .subscribe(data => {
                this.project = data;
                this.project.user = data.user;
                this.userFirstName = this.project.user.firstName + ' ' + this.project.user.lastName;
            })
    };

    updateProject(project: Project): void {
        if(!this.processDateToShowError()) {
            this.projectService.updateProject(project)
                .subscribe(data => {
                    this.projects.forEach((t, i) => {
                        if (t.projectId === data.projectId) {
                            this.projects[i] = data;
                            this.projects[i].completed = this.checkEndDateIsPast(data.endDate);
                        }
                    });
    
                    this.project = new Project();
                    this.userFirstName = null;
                })
        }
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
                this.projects.forEach((t, i) => {
                    this.projects[i].completed = this.checkEndDateIsPast(t.endDate);
                });
            });

    };

    sortListByParameter(param: string): void {

        if (param === "startDate") {
            this.projects = this.projects.sort((a, b) => a.startDate.localeCompare(b.startDate));
        } else if (param === "endDate") {
            this.projects = this.projects.sort((a, b) => a.endDate.localeCompare(b.endDate));
        } else if (param === "priority") {
            this.projects = this.projects.sort((a, b) => a.priority - b.priority);
        } else if (param === "completed") {
            this.projects = this.projects.sort((a, b) => a.completed.localeCompare(b.completed));
        }

    };

    openModal(id: string) {
        this.userService.getUsers()
            .subscribe(data => {
                this.users = data;
            });
        this.modalService.open(id);
    };

    closeModal(id: string) {
        this.modalService.close(id);
    };

    userFirstName: string;

    selectUser(id: string, user: User) {
        this.project.user = user;
        this.userFirstName = this.project.user.firstName + ' ' + this.project.user.lastName;
        this.modalService.close(id);
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

    checkEndDateIsPast(endDateVal: string) {
        if (Date.parse(endDateVal) < Date.parse(new Date().toString())) {
            return 'Yes';
        } else {
            return 'No';
        }
    };
    
    checkEndDateIsBeforeStartDate(startDateVal: string, endDateVal: string) {
        if (Date.parse(endDateVal) < Date.parse(startDateVal)) {
            return true;
        } else {
            return false;
        }
    };
    
    callReset() {
        this.isDisabled = false;
        this.triggerSomeEvent();
    }
    
    hideErrorMsg(){
        this.showErrEndDateBeforeStartDate = false;
    }
}
