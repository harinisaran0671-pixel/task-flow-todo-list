import React, { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Task } from '../types';

interface TodoItemProps {
  task: Task;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newText: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  const handleSaveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== task.text) {
      onEditTask(task.id, trimmed);
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <motion.li
      id={`task-item-${task.id}`}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className={`group flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
        task.completed
          ? 'bg-zinc-50/70 border-zinc-200/60'
          : 'bg-white border-zinc-200/90 shadow-2xs hover:border-zinc-300'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          id={`toggle-task-${task.id}`}
          type="button"
          onClick={() => onToggleTask(task.id)}
          className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
            task.completed
              ? 'bg-zinc-900 border-zinc-900 text-white'
              : 'border-zinc-300 hover:border-zinc-400 bg-white'
          }`}
          aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {isEditing ? (
          <input
            ref={editInputRef}
            id={`edit-task-input-${task.id}`}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            className="flex-1 px-2 py-1 text-sm bg-zinc-100 border border-zinc-300 rounded-md text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          />
        ) : (
          <span
            id={`task-text-${task.id}`}
            onDoubleClick={() => setIsEditing(true)}
            className={`text-sm select-none break-words cursor-pointer transition-colors ${
              task.completed
                ? 'line-through text-zinc-400 font-normal'
                : 'text-zinc-800 font-medium'
            }`}
            title="Double-click to edit"
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        {!isEditing && (
          <button
            id={`edit-btn-${task.id}`}
            type="button"
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors"
            aria-label="Edit task"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          id={`delete-task-${task.id}`}
          type="button"
          onClick={() => onDeleteTask(task.id)}
          className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Delete task"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.li>
  );
};
