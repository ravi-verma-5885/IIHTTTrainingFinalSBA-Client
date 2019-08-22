import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { ModalModule } from './projects/_modal';

import {UserService} from './user/user.service';
import {ProjectService} from './projects/project.service';
import {HttpClientModule} from "@angular/common/http";
import {AddProjectComponent} from './projects/add-project.component';
import {AddUserComponent} from './user/add-user.component';
//import {ModalUserComponent} from './projects/modal-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddUserComponent
   // ModalUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule
  ],
  providers: [UserService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }