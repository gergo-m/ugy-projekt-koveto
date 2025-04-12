import { User } from "./User";

export interface Task {
    id: number;
    title: string;
    status: 'not_started' | 'in_progress' |'done';
    priority: 'lowest' | 'low' | 'medium' | 'high' | 'highest';
    dueDate: Date;
    assignedTo: User;
    description?: string;
  }