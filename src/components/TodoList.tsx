import React from 'react';
import { AnimatePresence } from 'motion/react';
import { CheckCircle, ClipboardList, Sparkles } from 'lucide-react';
import { FilterType, Task } from '../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  filter: FilterType;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newText: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  tasks,
  filter,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div id="todo-empty-state" className="py-12 flex flex-col items-center justify-center text-center text-zinc-400">
        {filter === 'all' && (
          <>
            <div className="p-3 bg-zinc-100 rounded-2xl mb-3 text-zinc-400">
              <ClipboardList className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-zinc-600">No tasks yet</p>
            <p className="text-xs text-zinc-400 mt-0.5">Add a task above to get started!</p>
          </>
        )}
        {filter === 'active' && (
          <>
            <div className="p-3 bg-zinc-100 rounded-2xl mb-3 text-emerald-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-zinc-600">All caught up!</p>
            <p className="text-xs text-zinc-400 mt-0.5">No active tasks pending.</p>
          </>
        )}
        {filter === 'completed' && (
          <>
            <div className="p-3 bg-zinc-100 rounded-2xl mb-3 text-zinc-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-zinc-600">No completed tasks yet</p>
            <p className="text-xs text-zinc-400 mt-0.5">Finish a task to see it here.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <ul id="todo-list-container" className="space-y-2 list-none p-0 m-0">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
};
