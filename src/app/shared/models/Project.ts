import { User } from "./User";

export interface Project {
    id: number;
    name: string;
    description: string;
    deadline: Date;
    participants: User[];
}