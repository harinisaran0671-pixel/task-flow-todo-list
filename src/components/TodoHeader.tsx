import React from 'react';
import { CheckCircle2, ListTodo } from 'lucide-react';

interface TodoHeaderProps {
  totalTasks: number;
  completedTasks: number;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({ totalTasks, completedTasks }) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <header id="todo-header" className="mb-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-zinc-900 text-white shadow-xs">
              <ListTodo className="w-5 h-5" />
            </div>
            <h1 id="todo-app-title" className="text-2xl font-bold tracking-tight text-zinc-900">
              To-Do List
            </h1>
          </div>
          <p id="todo-current-date" className="text-sm font-medium text-zinc-500">
            {today}
          </p>
        </div>

        {totalTasks > 0 && (
          <div
            id="todo-progress-pill"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-zinc-700"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600" />
            <span>
              {completedTasks}/{totalTasks} Done ({completionPercentage}%)
            </span>
          </div>
        )}
      </div>

      {totalTasks > 0 && (
        <div className="mt-4 w-full bg-zinc-200/80 h-1.5 rounded-full overflow-hidden">
          <div
            id="todo-progress-bar"
            className="bg-zinc-800 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      )}
    </header>
  );
};
