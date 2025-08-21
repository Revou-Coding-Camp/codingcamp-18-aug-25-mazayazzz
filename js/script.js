const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date-input");
const taskList = document.getElementById("task-list");

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

function addTask(task, dueDate) {
  const li = document.createElement("li");
  li.className =
    "border border-pink-300 rounded-xl p-3 bg-pink-100 flex justify-between items-center transition transform duration-300 ease-out opacity-0 translate-y-2";

  let taskText = `✨ ${task}`;
  if (dueDate) {
    taskText += ` (Due: ${dueDate})`;
  }

  li.innerHTML = `
    <span class="text-pink-700 font-medium">${taskText}</span>
    <button onclick="deleteTask(this)" 
      class="ml-4 bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg shadow-md transition">
      ❌
    </button>
  `;

  taskList.appendChild(li);

  requestAnimationFrame(() => {
    li.classList.remove("opacity-0", "translate-y-2");
    li.classList.add("opacity-100", "translate-y-0");
  });
}

function deleteTask(button) {
  const li = button.parentElement;

  li.classList.add("opacity-0", "translate-y-2");
  setTimeout(() => li.remove(), 300);
}

function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks? 🌸")) {
    const items = document.querySelectorAll("#task-list li");
    items.forEach((li, index) => {
      setTimeout(() => {
        li.classList.add("opacity-0", "translate-y-2");
        setTimeout(() => li.remove(), 300);
      }, index * 100);
    });
  }
}
