import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { ModalModule } from './_modal';

import {UserService} from './user/user.service';
import {ProjectService} from './projects/project.service';
import {TaskService} from './tasks/task.service';
import {EditTaskService} from './tasks/edit-task.service';
import {ParentTaskService} from './tasks/parentTask.service';
import {HttpClientModule} from "@angular/common/http";
import {AddProjectComponent} from './projects/add-project.component';
import {AddTaskComponent} from './tasks/add-task.component';
import {AddUserComponent} from './user/add-user.component';
import {ViewTaskComponent} from './tasks/view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule
  ],
  providers: [UserService, ProjectService, TaskService, ParentTaskService, EditTaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }