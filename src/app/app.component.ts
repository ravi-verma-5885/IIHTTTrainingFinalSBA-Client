import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EditTaskService } from './tasks/edit-task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'IIHTTrainingFinalSBA-client';
    
    constructor(private router: Router,
        private editTaskService: EditTaskService) {

    }
    
    showAddTask(): void {
        this.editTaskService.task = null;
        this.router.navigate(['addTasks']);
    };
}
