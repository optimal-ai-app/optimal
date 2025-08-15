// Types
export interface UserData {
  id: string;
  userName: string;
  email: string;
}
export type User = UserData | null;

export interface Goal {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  dueDate: Date;
  status: 'active' | 'completed' | 'archived';
  tags: string[];
  progress: number;
  updatedAt: Date;
  streak: number;
  type?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  completionDate: Date | null;
  priority: '!' | '!!' | '!!!';
  dueDate: Date;
  status: 'todo' | 'completed' | 'archived';
  sharedId: string;
  goalId?: string;
  milestone?: boolean;
}
