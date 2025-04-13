import { User } from './models/User';
import { Project } from './models/Project';

export const ProfileObject = [
    {
        'id': 0,
        'name': {
            'first_name': "Johnathan",
            'last_name': "Doe"
        },
        'email': "johndoe97@example.com",
        'password': "johndoe123",
        'bio': "Full-stack developer with a passion for Agile methodologies.",
        'location': "New York, USA",
        'account': {
            'created_at': new Date(2024, 2, 20, 12, 34, 56, 0),
            'last_login': new Date(2025, 3, 1, 18, 45, 12, 0),
            'role': "user",
            'preferences': {
                theme: "dark",
                language: "en-US",
                notifications: true
            }
        } as const,
        'statistics': {
            'projects': {
                'total': 15,
                'completed': 9,
                'pending': 6
            },
            'tasks': {
                'assigned': 24,
                'completed': 18,
                'pending': 6,
                'overdue': 3,
            }
        }
    },
    {
        'id': 1,
        'name': {
            'first_name': "Alice",
            'last_name': "Bennett"
        },
        'email': "aliceb@example.com",
        'password': "alicebennett123",
        'bio': "UI/UX Designer passionate about accessibility.",
        'location': "San Francisco, USA",
        'account': {
            'created_at': new Date(2023, 7, 15, 8, 22, 45, 0),
            'last_login': new Date(2025, 3, 2, 10, 20, 30, 0),
            'role': "admin",
            'preferences': {
                theme: "light",
                language: "en-US",
                notifications: false
            }
        } as const,
        'statistics': {
            'projects': {
                'total': 22,
                'completed': 18,
                'pending': 4
            },
            'tasks': {
                'assigned': 30,
                'completed': 25,
                'pending': 5,
                'overdue': 1,
            }
        }
    },
    {
        'id': 2,
        'name': {
            'first_name': "Robert",
            'last_name': "Chen"
        },
        'email': "robchen@example.com",
        'password': "robertchen123",
        'bio': "Backend engineer specializing in Node.js and databases.",
        'location': "Seattle, USA",
        'account': {
            'created_at': new Date(2022, 10, 5, 14, 10, 0, 0),
            'last_login': new Date(2025, 2, 28, 22, 30, 0, 0),
            'role': "user",
            'preferences': {
                theme: "dark",
                language: "hu-HU",
                notifications: true
            }
        } as const,
        'statistics': {
            'projects': {
                'total': 12,
                'completed': 7,
                'pending': 5
            },
            'tasks': {
                'assigned': 20,
                'completed': 15,
                'pending': 4,
                'overdue': 1,
            }
        }
    },
    {
        'id': 3,
        'name': {
            'first_name': "Sophia",
            'last_name': "Martinez"
        },
        'email': "sophia.m@example.com",
        'password': "sophiamartinez123",
        'bio': "Product manager focused on delivering user-centered solutions.",
        'location': "London, UK",
        'account': {
            'created_at': new Date(2021, 5, 12, 9, 45, 0, 0),
            'last_login': new Date(2025, 2, 25, 14, 20, 0),
            'role': "user",
            'preferences': {
                theme: "light",
                language: "en-US",
                notifications: true
            }
        } as const,
        'statistics': {
            'projects': {
                'total': 28,
                'completed': 21,
                'pending': 7
            },
            'tasks': {
                'assigned': 35,
                'completed': 30,
                'pending': 5,
                'overdue': 0,
            }
        }
    }
];

export const ProjectObject = [
    {
        id: 0,
        name: "Website Redesign",
        description: "A complete overhaul of the company website to improve user experience and modernize the design.",
        start: new Date(2025, 2, 10),
        deadline: new Date(2025, 3, 25),
        participants: [ProfileObject[0], ProfileObject[1]]
    },
    {
        id: 1,
        name: "Mobile App Development",
        description: "Developing a cross-platform mobile app for better customer engagement.",
        start: new Date(2025, 4, 1),
        deadline: new Date(2025, 4, 10),
        participants: [ProfileObject[2]]
    },
    {
        id: 2,
        name: "Image Analysis Automation",
        description: "Automation of our image analysis procedure.",
        start: new Date(2025, 1, 20),
        deadline: new Date(2025, 2, 28),
        participants: [ProfileObject[0], ProfileObject[2], ProfileObject[3]]
    }
];
