// script.js

// Ambil elemen penting
const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date-input");
const taskList = document.getElementById("task-list");

// Validasi form sebelum tambah task
function validateForm() {
  const taskValue = taskInput.value.trim();
  const dueDateValue = dueDateInput.value;

  if (taskValue === "") {
    alert("Please enter a task ✨");
    return;
  }

  addTask(taskValue, dueDateValue);
  taskInput.value = "";
  dueDateInput.value = "";
}

// Fungsi untuk menambah task ke daftar
function addTask(task, dueDate) {
  const li = document.createElement("li");
  li.className =
    "border border-pink-200 rounded-xl p-3 bg-pink-100 flex justify-between items-center animate-fadeIn";

  let taskText = `✨ ${task}`;
  if (dueDate) {
    taskText += ` (Due: ${dueDate})`;
  }

  li.innerHTML = `
    <span>${taskText}</span>
    <button onclick="deleteTask(this)" class="ml-4 bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg shadow-md transition">❌</button>
  `;

  taskList.appendChild(li);
}

// Fungsi hapus 1 task
function deleteTask(button) {
  const li = button.parentElement;
  li.remove();
}

// Fungsi hapus semua task
function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks? 🌸")) {
    taskList.innerHTML = "";
  }
}

// Animasi masuk (CSS inject)
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
`;
document.head.appendChild(style);
