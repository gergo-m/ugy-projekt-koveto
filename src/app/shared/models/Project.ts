import { User } from "./User";
import { Task } from "./Task";

export interface Project {
    id: string;
    name: string;
    description: string;
    start: Date;
    deadline: Date;
    participants: User[];
    participantIds: String[];
    tasks: Task[];
}