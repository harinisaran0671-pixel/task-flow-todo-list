/**
 * To-Do List Web Application - Main JavaScript
 * GitHub-Ready Vanilla JS Implementation
 */

(function () {
  'use strict';

  // Constants
  const STORAGE_KEY = 'todo_app_tasks';

  const DEFAULT_TASKS = [
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

  // Application State
  let tasks = loadTasks();
  let currentFilter = 'all'; // 'all' | 'active' | 'completed'

  // DOM Elements
  const currentDateEl = document.getElementById('current-date');
  const progressPillEl = document.getElementById('progress-pill');
  const progressCountEl = document.getElementById('progress-count');
  const progressPercentEl = document.getElementById('progress-percent');
  const progressTrackEl = document.getElementById('progress-track');
  const progressFillEl = document.getElementById('progress-fill');
  
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const btnAdd = document.getElementById('btn-add');
  
  const todoListEl = document.getElementById('todo-list');
  const emptyStateEl = document.getElementById('empty-state');
  
  const todoFooterEl = document.getElementById('todo-footer');
  const tasksRemainingEl = document.getElementById('tasks-remaining');
  const filterBtns = document.querySelectorAll('.btn-filter');
  const countAllEl = document.getElementById('count-all');
  const countActiveEl = document.getElementById('count-active');
  const countCompletedEl = document.getElementById('count-completed');
  const btnClearCompleted = document.getElementById('btn-clear-completed');

  // Initialization
  function init() {
    renderDate();
    setupEventListeners();
    render();
  }

  // Load Tasks from localStorage
  function loadTasks() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Unable to read from localStorage:', e);
    }
    return DEFAULT_TASKS;
  }

  // Save Tasks to localStorage
  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.warn('Unable to write to localStorage:', e);
    }
  }

  // Render Date in Header
  function renderDate() {
    if (!currentDateEl) return;
    const now = new Date();
    currentDateEl.textContent = now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  }

  // Event Listeners Setup
  function setupEventListeners() {
    // Input & Add Task Form
    if (todoInput && btnAdd) {
      todoInput.addEventListener('input', () => {
        btnAdd.disabled = !todoInput.value.trim();
      });
    }

    if (todoForm) {
      todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (!text) return;
        addTask(text);
        todoInput.value = '';
        if (btnAdd) btnAdd.disabled = true;
      });
    }

    // Filter Buttons
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        if (filter) {
          currentFilter = filter;
          render();
        }
      });
    });

    // Clear Completed Button
    if (btnClearCompleted) {
      btnClearCompleted.addEventListener('click', () => {
        tasks = tasks.filter((t) => !t.completed);
        saveTasks();
        render();
      });
    }
  }

  // Core Task Actions
  function addTask(text) {
    const newTask = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      text: text,
      completed: false,
      createdAt: Date.now(),
    };
    tasks.unshift(newTask);
    saveTasks();
    render();
  }

  function toggleTask(id) {
    tasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveTasks();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    render();
  }

  function editTask(id, newText) {
    const trimmed = newText.trim();
    if (!trimmed) {
      deleteTask(id);
      return;
    }
    tasks = tasks.map((t) => (t.id === id ? { ...t, text: trimmed } : t));
    saveTasks();
    render();
  }

  // Main Render Function
  function render() {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    // 1. Update Progress Header
    if (progressPillEl && progressTrackEl && progressFillEl) {
      if (total > 0) {
        progressPillEl.style.display = 'inline-flex';
        progressTrackEl.style.display = 'block';
        if (progressCountEl) progressCountEl.textContent = `${completed}/${total} Done`;
        if (progressPercentEl) progressPercentEl.textContent = `(${percent}%)`;
        progressFillEl.style.width = `${percent}%`;
      } else {
        progressPillEl.style.display = 'none';
        progressTrackEl.style.display = 'none';
      }
    }

    // 2. Filter Tasks
    const filtered = tasks.filter((t) => {
      if (currentFilter === 'active') return !t.completed;
      if (currentFilter === 'completed') return t.completed;
      return true;
    });

    // 3. Render List & Empty State
    if (!todoListEl || !emptyStateEl) return;
    todoListEl.innerHTML = '';

    if (filtered.length === 0) {
      emptyStateEl.style.display = 'flex';
      renderEmptyState();
    } else {
      emptyStateEl.style.display = 'none';
      filtered.forEach((task) => {
        const itemEl = createTaskElement(task);
        todoListEl.appendChild(itemEl);
      });
    }

    // 4. Update Footer & Badges
    if (todoFooterEl) {
      todoFooterEl.style.display = total > 0 ? 'flex' : 'none';
    }

    if (tasksRemainingEl) {
      tasksRemainingEl.textContent = `${active} ${active === 1 ? 'task' : 'tasks'} remaining`;
    }

    if (countAllEl) countAllEl.textContent = total;
    if (countActiveEl) countActiveEl.textContent = active;
    if (countCompletedEl) countCompletedEl.textContent = completed;

    filterBtns.forEach((btn) => {
      if (btn.getAttribute('data-filter') === currentFilter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (btnClearCompleted) {
      btnClearCompleted.style.display = completed > 0 ? 'inline-block' : 'none';
    }
  }

  // Create DOM Element for Single Task Item
  function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;
    li.id = `task-item-${task.id}`;

    // Content container
    const contentDiv = document.createElement('div');
    contentDiv.className = 'todo-item-content';

    // Toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'btn-toggle';
    toggleBtn.setAttribute('aria-label', task.completed ? 'Mark task as incomplete' : 'Mark task as complete');
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
    toggleBtn.addEventListener('click', () => toggleTask(task.id));

    // Task text
    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;
    textSpan.title = 'Double-click to edit';

    // Inline edit triggers
    textSpan.addEventListener('doubleclick', () => startInlineEdit(li, task, textSpan));

    contentDiv.appendChild(toggleBtn);
    contentDiv.appendChild(textSpan);

    // Actions container
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'item-actions';

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'btn-action btn-edit';
    editBtn.setAttribute('aria-label', 'Edit task');
    editBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
      </svg>
    `;
    editBtn.addEventListener('click', () => startInlineEdit(li, task, textSpan));

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn-action btn-delete';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    `;
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(contentDiv);
    li.appendChild(actionsDiv);

    return li;
  }

  // Inline Editing Handler
  function startInlineEdit(itemEl, task, textSpan) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = task.text;

    const contentDiv = itemEl.querySelector('.todo-item-content');
    contentDiv.replaceChild(input, textSpan);
    input.focus();
    input.select();

    let finished = false;

    function finishEdit(save) {
      if (finished) return;
      finished = true;
      if (save) {
        editTask(task.id, input.value);
      } else {
        render();
      }
    }

    input.addEventListener('blur', () => finishEdit(true));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        finishEdit(true);
      } else if (e.key === 'Escape') {
        finishEdit(false);
      }
    });
  }

  // Render Contextual Empty State
  function renderEmptyState() {
    if (!emptyStateEl) return;
    
    if (currentFilter === 'all') {
      emptyStateEl.innerHTML = `
        <div class="empty-icon-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            <path d="M9 12h6"></path>
            <path d="M9 16h6"></path>
          </svg>
        </div>
        <p class="empty-state-title">No tasks yet</p>
        <p class="empty-state-desc">Add a task above to get started!</p>
      `;
    } else if (currentFilter === 'active') {
      emptyStateEl.innerHTML = `
        <div class="empty-icon-box" style="color: var(--success); background-color: var(--success-bg);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
          </svg>
        </div>
        <p class="empty-state-title">All caught up!</p>
        <p class="empty-state-desc">No active tasks pending.</p>
      `;
    } else if (currentFilter === 'completed') {
      emptyStateEl.innerHTML = `
        <div class="empty-icon-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <p class="empty-state-title">No completed tasks yet</p>
        <p class="empty-state-desc">Finish a task to see it here.</p>
      `;
    }
  }

  // Start app when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
