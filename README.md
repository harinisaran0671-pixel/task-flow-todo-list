# 📝 To-Do List Web Application

A clean, modular, and responsive **To-Do List** application built with semantic **HTML5**, modern **CSS3**, and vanilla **JavaScript (ES6+)**. Designed for task management, local data persistence, and interactive user feedback.

---

## ✨ Features

- ➕ **Task Creation**: Add tasks with input validation (prevents empty submissions).
- ✅ **Task Completion**: Toggle task status with animated custom checkboxes and strikethrough styling.
- ✏️ **Inline Editing**: Double-click any task text or click the edit icon to modify task details in place.
- 🗑️ **Task Deletion**: Remove individual tasks with a single click.
- 🔍 **Dynamic Filtering**: Switch between **All**, **Active**, and **Completed** tasks with real-time item counters.
- 🧹 **Clear Completed**: One-click bulk removal of finished tasks.
- 📊 **Real-time Progress**: Visual completion percentage and progress bar that dynamically updates as tasks are completed.
- 💾 **Local Persistence**: Automatically synchronizes all changes to browser `localStorage`.
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile screens.
- ⌨️ **Keyboard Accessible**: Full support for <kbd>Enter</kbd> (add/save), <kbd>Escape</kbd> (cancel edit), and tab navigation.

---

## 📁 Project Structure

```text
├── index.html       # Semantic HTML5 layout and container elements
├── style.css        # Modern CSS3 styles, CSS variables, flexbox/grid layout
├── script.js        # Vanilla JS logic, state handling, DOM events, & localStorage
└── README.md        # Comprehensive project documentation
```

---

## 🚀 Getting Started

### Option 1: Direct Browser Launch (Vanilla)
1. Clone this repository or download the project files:
   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   cd todo-list-app
   ```
2. Open `index.html` directly in your web browser (double-click or right-click -> "Open With Browser").

### Option 2: Run with a Local Server (VS Code / Python / Node)
Using **Live Server** (VS Code extension) or Python:
```bash
# Using Python 3
python -m http.server 3000

# Using Node npx serve
npx serve .
```
Navigate to `http://localhost:3000` in your browser.

---

## ⌨️ Keyboard Shortcuts & Interactions

| Action | Interaction |
| :--- | :--- |
| **Add New Task** | Type in the input field and press <kbd>Enter</kbd> |
| **Edit Task** | Double-click the task title or click the <kbd>✏️</kbd> edit button |
| **Save Edit** | Press <kbd>Enter</kbd> or click outside the edit box |
| **Cancel Edit** | Press <kbd>Escape</kbd> while editing |
| **Toggle Status** | Click the custom checkbox on the left of any task |
| **Delete Task** | Click the <kbd>🗑️</kbd> trash button on the right |

---

## 🛠️ Technical Architecture

### 1. State Management
The application manages state through a central `tasks` array:
```javascript
{
  id: string,         // Unique timestamp or UUID
  text: string,       // Task description
  completed: boolean, // Completion status
  createdAt: number   // Timestamp
}
```

### 2. Persistence Layer
Data persistence is handled through the browser's `localStorage` API under the key `'todo_app_tasks'`. Whenever a task is created, toggled, edited, or removed, the state is persisted and the DOM updates reactively.

### 3. Styling & Theming
- **CSS Custom Properties**: Theme variables defined on `:root` for typography, spacing, radius, colors, and shadows.
- **Design Principles**: High contrast, subtle neutral grays (`#18181b`, `#71717a`, `#f4f4f5`), and fluid transitions for smooth user interactions.

---

## 🌐 Deploying to GitHub Pages

1. Push the project files (`index.html`, `style.css`, `script.js`, `README.md`) to your GitHub repository.
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://<your-username>.github.io/<repository-name>/`.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
