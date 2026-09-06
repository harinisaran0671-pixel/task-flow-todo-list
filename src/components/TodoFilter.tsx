import React from 'react';
import { FilterType } from '../types';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  totalCount: number;
  onClearCompleted: () => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  currentFilter,
  onFilterChange,
  activeCount,
  completedCount,
  totalCount,
  onClearCompleted,
}) => {
  const filters: { id: FilterType; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: totalCount },
    { id: 'active', label: 'Active', count: activeCount },
    { id: 'completed', label: 'Completed', count: completedCount },
  ];

  return (
    <footer id="todo-footer" className="mt-6 pt-4 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
      <div id="todo-active-count" className="font-medium text-zinc-600">
        {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
      </div>

      <div id="todo-filter-group" className="flex items-center p-1 bg-zinc-100/90 rounded-xl border border-zinc-200/70">
        {filters.map((filter) => {
          const isActive = currentFilter === filter.id;
          return (
            <button
              key={filter.id}
              id={`filter-${filter.id}-btn`}
              type="button"
              onClick={() => onFilterChange(filter.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
              }`}
            >
              <span>{filter.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-zinc-100 text-zinc-800' : 'bg-zinc-200/60 text-zinc-600'
                }`}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      {completedCount > 0 ? (
        <button
          id="clear-completed-btn"
          type="button"
          onClick={onClearCompleted}
          className="text-zinc-500 hover:text-red-600 font-medium hover:underline transition-colors cursor-pointer"
        >
          Clear completed
        </button>
      ) : (
        <div className="hidden sm:block w-20" aria-hidden="true" />
      )}
    </footer>
  );
};
