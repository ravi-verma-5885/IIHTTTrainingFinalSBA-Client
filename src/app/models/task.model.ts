import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { ParentTask } from '../models/parentTask.model';

export class Task {
  taskId: number;
  taskName: string;
  startDate: any;
  endDate: any;
  priority: number;
  status: any;
  user: User;
  project: Project;
  parentTask: ParentTask;
}