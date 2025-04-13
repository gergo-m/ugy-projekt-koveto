import { User } from "./User";
import { Comment } from "./Comment";

export enum TaskStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  DONE = 'done'
}

export enum TaskPriority {
  LOWEST = 'lowest',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  HIGHEST = 'highest'
}

export interface Task {
    id: number;
    projectId: number;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    assignedTo: User;
    description?: string;
    comments: Comment[];
  }