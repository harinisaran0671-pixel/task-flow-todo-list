import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAddTask: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTask }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;
    onAddTask(trimmed);
    setInputText('');
  };

  return (
    <form
      id="todo-form"
      onSubmit={handleSubmit}
      className="relative flex items-center gap-2 mb-6"
    >
      <div className="relative flex-1">
        <input
          id="new-task-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-colors text-sm shadow-2xs"
          autoComplete="off"
        />
      </div>
      <button
        id="add-task-btn"
        type="submit"
        disabled={!inputText.trim()}
        className="flex items-center justify-center gap-1.5 px-4 py-3 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition-all shadow-2xs active:scale-[0.98]"
        aria-label="Add task"
      >
        <Plus className="w-4 h-4" />
        <span>Add</span>
      </button>
    </form>
  );
};
