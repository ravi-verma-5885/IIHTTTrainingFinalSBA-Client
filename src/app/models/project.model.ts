import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { ParentTask } from '../models/parentTask.model';

export class Project {
  projectId: number;
  projectName: string;
  startDate: any;
  endDate: any;
  priority: number;
  completed: any;
  user: User;
  tasks: Task[];
  parentTasks: ParentTask[];
}