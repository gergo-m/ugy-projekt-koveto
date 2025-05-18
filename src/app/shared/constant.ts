import { User } from './models/User';
import { Project } from './models/Project';
import { Task, TaskPriority, TaskStatus } from './models/Task';

export const ProfileObject = [
    {
        'id': "0",
        'name': {
            'first_name': "Jonathan",
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
                'pending': 6,
                'overdue': 0,
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
        'id': "1",
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
                'pending': 4,
                'overdue': 0,
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
        'id': "2",
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
                'pending': 5,
                'overdue': 0
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
        'id': "3",
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
                'pending': 7,
                'overdue': 0,
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

/*
export const TaskObject: Task[] = [
    {
      id: 0,
      projectId: 0,
      title: 'Design homepage layout',
      description: 'Create new UI design for homepage',
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      dueDate: new Date(2025, 3, 1),
      assignedTo: ProfileObject[0],
      comments: [
        {
          id: 1,
          text: 'Need to align with brand guidelines',
          author: ProfileObject[1],
          createdAt: new Date(2025, 2, 15)
        },
        {
          id: 2,
          text: 'Approved by product team',
          author: ProfileObject[0],
          createdAt: new Date(2025, 2, 16)
        }
      ]
    },
    {
      id: 1,
      projectId: 0,
      title: 'Implement user authentication',
      description: 'Develop login/register functionality',
      status: TaskStatus.NOT_STARTED,
      priority: TaskPriority.MEDIUM,
      dueDate: new Date(2025, 3, 10),
      assignedTo: ProfileObject[1],
      comments: [
        {
            id: 101,
            text: 'Need to decide between JWT and session-based authentication. Let\'s discuss in next standup.',
            author: ProfileObject[0],
            createdAt: new Date(2025, 2, 5)
        },
        {
            id: 102,
            text: 'Security review completed - recommend implementing OAuth2 for third-party integrations.',
            author: ProfileObject[3],
            createdAt: new Date(2025, 2, 8)
        },
        {
            id: 103,
            text: 'Basic login flow implemented. Needs password strength validation and rate limiting.',
            author: ProfileObject[1],
            createdAt: new Date(2025, 2, 12)
        }
      ]
    },
    {
      id: 2,
      projectId: 1,
      title: 'API integration',
      description: 'Connect mobile app to backend API',
      status: TaskStatus.DONE,
      priority: TaskPriority.HIGHEST,
      dueDate: new Date(2025, 4, 1),
      assignedTo: ProfileObject[0],
      comments: [
        {
            id: 201,
            text: 'API endpoints finalized and documented in Swagger. Team review requested.',
            author: ProfileObject[0],
            createdAt: new Date(2025, 3, 10)
        },
        {
            id: 202,
            text: 'Implemented error handling for 400/500 status codes. Needs testing with edge cases.',
            author: ProfileObject[2],
            createdAt: new Date(2025, 3, 15)
        },
        {
            id: 203,
            text: 'Performance optimization complete - reduced response times by 40%. Ready for production.',
            author: ProfileObject[0],
            createdAt: new Date(2025, 3, 20)
        },
        {
            id: 204,
            text: 'Final smoke tests passed. Documentation updated in developer portal.',
            author: ProfileObject[3],
            createdAt: new Date(2025, 3, 25)
        }
      ]
    }
  ];
  */
  