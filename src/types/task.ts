export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Future extensibility for teaching purposes
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  dueDate?: Date;
  tags?: string[];
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description?: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  stats: TaskStats;
}