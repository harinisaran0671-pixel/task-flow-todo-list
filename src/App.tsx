import React, { useState, useEffect } from 'react';
import { FilterType, Task } from './types';
import { TodoHeader } from './components/TodoHeader';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

const LOCAL_STORAGE_KEY = 'todo_app_tasks';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    text: 'Review project requirements',
    completed: true,
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: '2',
    text: 'Design modular to-do list components',
    completed: true,
    createdAt: Date.now() - 3600000,
  },
  {
    id: '3',
    text: 'Build and test task management features',
    completed: false,
    createdAt: Date.now(),
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback if localStorage fails
    }
    return INITIAL_TASKS;
  });

  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Ignore write errors
    }
  }, [tasks]);

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: string, newText: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <main id="app-root" className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-xl">
        <div
          id="todo-app-card"
          className="bg-white rounded-2xl border border-zinc-200/90 shadow-sm p-6 sm:p-8 transition-all"
        >
          <TodoHeader totalTasks={totalTasks} completedTasks={completedTasks} />

          <TodoInput onAddTask={handleAddTask} />

          <TodoList
            tasks={filteredTasks}
            filter={filter}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />

          {totalTasks > 0 && (
            <TodoFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              activeCount={activeTasks}
              completedCount={completedTasks}
              totalCount={totalTasks}
              onClearCompleted={handleClearCompleted}
            />
          )}
        </div>

        <p className="text-center text-xs text-zinc-400 mt-6 select-none">
          Tip: Double-click any task to edit its title. Press Enter to save.
        </p>
      </div>
    </main>
  );
}
