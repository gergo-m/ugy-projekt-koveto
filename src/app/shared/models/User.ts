import { Task } from "./Task";

export interface User {
    id: number;
    name: {
        firstname: string;
        lastname: string;
    };
    email: string;
    password: string;
    role: 'admin'|'user';
    tasks: Task[];
    completed_tasks: any[];
}