function checkAuth() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    alert("You must log in first.");
    window.location.href = "login.html";
  } else {
    loadTodos();
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

function addTodo(event) {
  event.preventDefault();
  const input = document.getElementById("todoInput");
  const task = input.value.trim();

  if (!task) return;

  const now = new Date();
  const todo = {
    id: Date.now(),
    task,
    timestamp: now.toLocaleString(),
  };

  const user = localStorage.getItem("loggedInUser");
  const todos = JSON.parse(localStorage.getItem(`todos-${user}`)) || [];
  todos.push(todo);
  localStorage.setItem(`todos-${user}`, JSON.stringify(todos));

  input.value = "";
  loadTodos();
}

function loadTodos() {
  const user = localStorage.getItem("loggedInUser");
  const todos = JSON.parse(localStorage.getItem(`todos-${user}`)) || [];

  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const item = document.createElement("div");
    item.className = "todo-item";

    const left = document.createElement("div");
    left.innerHTML = `<strong>${todo.task}</strong><br><span class="todo-time">${todo.timestamp}</span>`;

    const right = document.createElement("div");
    right.innerHTML = `
      <button class="btn btn-sm btn-warning me-2" onclick="editTodo(${todo.id})">Edit</button>
      <button class="btn btn-sm btn-danger" onclick="deleteTodo(${todo.id})">Delete</button>
    `;

    item.appendChild(left);
    item.appendChild(right);
    list.appendChild(item);
  });
}

function editTodo(id) {
  const user = localStorage.getItem("loggedInUser");
  const todos = JSON.parse(localStorage.getItem(`todos-${user}`)) || [];

  const todo = todos.find(t => t.id === id);
  const newTask = prompt("Edit your task:", todo.task);
  if (newTask) {
    todo.task = newTask;
    todo.timestamp = new Date().toLocaleString();
    localStorage.setItem(`todos-${user}`, JSON.stringify(todos));
    loadTodos();
  }
}

function deleteTodo(id) {
  const user = localStorage.getItem("loggedInUser");
  let todos = JSON.parse(localStorage.getItem(`todos-${user}`)) || [];

  todos = todos.filter(t => t.id !== id);
  localStorage.setItem(`todos-${user}`, JSON.stringify(todos));
  loadTodos();
}
