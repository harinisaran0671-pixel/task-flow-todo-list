export type FilterType = 'all' | 'active' | 'completed';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}
