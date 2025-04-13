import { Project } from "./Project";
import { Task } from "./Task";
import { User } from "./User";

export interface Comment {
    id: number;
    text: string;
    author: User;
    createdAt: Date;
}