import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProjectComponent } from './projects/add-project.component';
//import { AddTaskComponent } from './user/user.component';
import { AddUserComponent} from './user/add-user.component';
//import { ViewTaskComponent } from './user/user.component';
//import { ModalUserComponent } from './projects/modal-user.component';

const routes: Routes = [
  { path: 'projects', component: AddProjectComponent },
  //{ path: 'addTasks', component: AddTaskComponent },
  { path: 'users', component: AddUserComponent }
  //{ path: 'viewTasks', component: ViewTaskComponent }
  //{ path: 'modalUsers', component: ModalUserComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }