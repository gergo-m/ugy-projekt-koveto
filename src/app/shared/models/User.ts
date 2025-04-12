import { Project } from "./Project";
import { Task } from "./Task";

export interface User {
    id: number;
    name: {
        first_name: string;
        last_name: string;
    };
    email: string;
    password: string;
    bio: string;
    location: string;
    account: {
        created_at: Date;
        last_login: Date;
        role: 'user' | 'admin';
        preferences: {
            theme: "light" | "dark";
            language: "en-US" | "hu-HU";
            notifications: boolean;
        };
    };
    projects?: Project[];
    tasks?: Task[];
    statistics: {
        projects: {
            total: number;
            completed: number;
            pending: number;
        };
        tasks: {
            assigned: number;
            completed: number;
            pending: number;
            overdue: number;
        };
    };
}