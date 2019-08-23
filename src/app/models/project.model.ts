import { User } from '../models/user.model';

export class Project {
  projectId: number;
  projectName: string;
  startDate: any;
  endDate: any;
  priority: number;
  completed: any;
  user: User;
    
}