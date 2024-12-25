// Navigation and Page Transitions
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');
const feedbackInput = document.getElementById('feedback-input');

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    pages.forEach((page) => page.classList.remove('active'));
    const target = button.getAttribute('data-target');
    document.querySelector(target).classList.add('active');
  });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

// Task Management Logic
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const completedList = document.getElementById('completed-list');

let tasks = [];
let completedCount = 0;

addTaskBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (task) {
    tasks.push({ task, completed: false });
    renderTasks();
    taskInput.value = '';
  }
});

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    listItem.innerHTML = `
      <span>${item.task}</span>
      <button class="complete-btn" data-index="${index}">Complete</button>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(listItem);
  });

  updateStatistics();
  
  // Add event listeners for complete and delete buttons
  document.querySelectorAll('.complete-btn').forEach((button) => {
    button.addEventListener('click', () => completeTask(button
        .getAttribute('data-index')));
    });
  
    document.querySelectorAll('.delete-btn').forEach((button) => {
      button.addEventListener('click', () => deleteTask(button.getAttribute('data-index')));
    });
  }
  
  function completeTask(index) {
    tasks[index].completed = true;
    const completedTask = tasks.splice(index, 1)[0];
    completedList.innerHTML += `<li class="task-item">${completedTask.task}</li>`;
    completedCount++;
    renderTasks();
  }
  
  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }
  
  function updateStatistics() {
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completedCount;
  }
  
  // Feedback Submission
  const submitFeedbackBtn = document.getElementById('submit-feedback-btn');
  submitFeedbackBtn.addEventListener('click', () => {
    const feedback = feedbackInput.value.trim();
    if (feedback) {
      alert('Thank you for your feedback!');
      feedbackInput.value = '';
    } else {
      alert('Please enter your feedback before submitting.');
    }
  });
  