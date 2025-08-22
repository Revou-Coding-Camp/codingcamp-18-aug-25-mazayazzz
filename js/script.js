console.log("Girly Todo List Script Loaded");
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

  if (!dueDateValue) {
    alert("Please select a due date 📅");
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // reset jam
  const dueDate = new Date(dueDateValue);

  if (dueDate < today) {
    alert("Due date cannot be in the past! 📅");
    return;
  }

  addTask(taskValue, dueDateValue);
  taskInput.value = "";
  dueDateInput.value = "";
}

function checkEmptyList() {
  const taskList = document.getElementById("task-list");
  const emptyMsg = document.getElementById("empty-list-msg");

  if (taskList.children.length === 0) {
    emptyMsg.classList.remove("hidden");
  } else {
    emptyMsg.classList.add("hidden");
  }
}

function addTask(task, dueDate) {
  const li = document.createElement("li");
  li.className =
    "border border-pink-300 rounded-xl p-3 bg-pink-100 flex justify-between items-center transition transform duration-300 ease-out opacity-0 translate-y-2";

  let taskText = `✨ ${task}`;
  if (dueDate) {
    taskText += ` (Due: ${dueDate})`;
  }

  li.setAttribute("data-task", task.toLowerCase());
  li.setAttribute("data-due", dueDate);

  li.innerHTML = `
    <div class="flex items-center gap-2">
      <input type="checkbox" class="task-checkbox w-5 h-5 accent-pink-500">
      <span class="task-text text-pink-700 font-medium">${taskText}</span>
    </div>
    <button onclick="deleteTask(this)" 
      class="ml-4 bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg shadow-md transition">
      ❌
    </button>
  `;

  const checkbox = li.querySelector(".task-checkbox");
  const text = li.querySelector(".task-text");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      text.classList.add("line-through", "text-gray-400");
    } else {
      text.classList.remove("line-through", "text-gray-400");
    }
  });

  taskList.appendChild(li);

  requestAnimationFrame(() => {
    li.classList.remove("opacity-0", "translate-y-2");
    li.classList.add("opacity-100", "translate-y-0");
  });

  checkEmptyList();
}

function deleteTask(button) {
  const li = button.parentElement;
  li.classList.add("opacity-0", "translate-y-2");
  setTimeout(() => {
    li.remove();
    checkEmptyList(); 
  }, 300);
}

function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks? 🌸")) {
    const items = document.querySelectorAll("#task-list li");
    items.forEach((li, index) => {
      setTimeout(() => {
        li.classList.add("opacity-0", "translate-y-2");
        setTimeout(() => {
          li.remove();
          checkEmptyList(); 
        }, 300);
      }, index * 100);
    });
  }
}

function filterTasks() {
  const keyword = prompt("Enter keyword or date (YYYY-MM-DD) to filter 🌸:").toLowerCase();
  const items = document.querySelectorAll("#task-list li");
  let visibleCount = 0;

  items.forEach((li) => {
    const task = li.getAttribute("data-task");
    const due = li.getAttribute("data-due");

    if (task.includes(keyword) || (due && due.includes(keyword))) {
      li.style.display = "flex";
      visibleCount++;
    } else {
      li.style.display = "none";
    }
  });

  const noTaskMsg = document.getElementById("no-task-msg");
  if (visibleCount === 0) {
    noTaskMsg.classList.remove("hidden");
  } else {
    noTaskMsg.classList.add("hidden");
  }
}

function resetFilter() {
  const items = document.querySelectorAll("#task-list li");
  items.forEach((li) => {
    li.style.display = "flex";
  });

  document.getElementById("no-task-msg").classList.add("hidden");
}