import { User } from '../models/user.model';
import { Project } from '../models/project.model';

export class Task {
  taskId: number;
  taskName: string;
  startDate: any;
  endDate: any;
  priority: number;
  status: any;
  user: User;
  project: Project;
    
}