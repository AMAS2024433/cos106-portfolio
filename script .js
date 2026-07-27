// ============================================
// Amas Omotola — Academic Portfolio
// script.js
// ============================================

// ---------- Mobile Nav Toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ============================================
// ACADEMIC PLANNER (planner.html)
// Demonstrates: arrays, functions, DOM manipulation, event handling
// ============================================

const taskForm = document.getElementById('taskForm');

if (taskForm) {
  const taskInput = document.getElementById('taskInput');
  const taskPriority = document.getElementById('taskPriority');
  const taskList = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');

  // Array holding all tasks
  let tasks = [];
  let taskIdCounter = 0;

  function renderTasks() {
    // Clear current list
    taskList.innerHTML = '';

    if (tasks.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'task-empty';
      empty.id = 'emptyState';
      empty.textContent = 'No tasks yet — add your first one above.';
      taskList.appendChild(empty);
      return;
    }

    tasks.forEach(function (task) {
      const item = document.createElement('div');
      item.className = 'task-item' + (task.completed ? ' completed' : '');
      item.dataset.id = task.id;

      const checkbox = document.createElement('button');
      checkbox.className = 'task-checkbox';
      checkbox.setAttribute('aria-label', 'Toggle task complete');
      checkbox.textContent = task.completed ? '✓' : '';
      checkbox.addEventListener('click', function () {
        toggleTask(task.id);
      });

      const text = document.createElement('span');
      text.className = 'task-text';
      text.textContent = task.text;

      const priority = document.createElement('span');
      priority.className = 'task-priority';
      priority.textContent = task.priority;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'task-delete';
      deleteBtn.setAttribute('aria-label', 'Delete task');
      deleteBtn.innerHTML = '&times;';
      deleteBtn.addEventListener('click', function () {
        deleteTask(task.id);
      });

      item.appendChild(checkbox);
      item.appendChild(text);
      item.appendChild(priority);
      item.appendChild(deleteBtn);
      taskList.appendChild(item);
    });
  }

  function addTask(text, priority) {
    tasks.push({
      id: taskIdCounter++,
      text: text,
      priority: priority,
      completed: false
    });
    renderTasks();
  }

  function toggleTask(id) {
    tasks = tasks.map(function (task) {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    renderTasks();
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (task) {
      return task.id !== id;
    });
    renderTasks();
  }

  taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = taskInput.value.trim();
    if (value === '') return;
    addTask(value, taskPriority.value);
    taskInput.value = '';
    taskInput.focus();
  });

  renderTasks();
}

// ============================================
// CONTACT FORM VALIDATION (contact.html)
// Demonstrates: form validation, event handling
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    message: document.getElementById('message')
  };
  const formStatus = document.getElementById('formStatus');

  function showError(fieldName) {
    document.getElementById('group-' + fieldName).classList.add('invalid');
  }

  function clearError(fieldName) {
    document.getElementById('group-' + fieldName).classList.remove('invalid');
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isDigitsOnly(value) {
    return /^\d+$/.test(value.replace(/[\s()+-]/g, ''));
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Name: not empty
    if (fields.name.value.trim() === '') {
      showError('name');
      valid = false;
    } else {
      clearError('name');
    }

    // Email: not empty + valid format
    if (fields.email.value.trim() === '' || !isValidEmail(fields.email.value.trim())) {
      showError('email');
      valid = false;
    } else {
      clearError('email');
    }

    // Phone: not empty + digits only
    if (fields.phone.value.trim() === '' || !isDigitsOnly(fields.phone.value.trim())) {
      showError('phone');
      valid = false;
    } else {
      clearError('phone');
    }

    // Message: not empty
    if (fields.message.value.trim() === '') {
      showError('message');
      valid = false;
    } else {
      clearError('message');
    }

    if (valid) {
      formStatus.textContent = 'Thank you — your message has been received. I\'ll get back to you soon.';
      formStatus.className = 'form-status show success';
      contactForm.reset();
    } else {
      formStatus.className = 'form-status';
    }
  });
}
