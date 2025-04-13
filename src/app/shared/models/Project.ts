import { User } from "./User";

export interface Project {
    id: number;
    name: string;
    description: string;
    start: Date;
    deadline: Date;
    participants: User[];
}