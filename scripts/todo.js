const todoList = document.getElementById("todo-list");
const newTask = document.getElementById("new-task");
const newTaskInput = document.getElementById("new-task-text");
let currentId = 0;

function displayNewTask() {
    newTask.classList.remove("hidden");
    newTaskInput.focus();
}

function createTask() {
    const text = newTaskInput.value;
    const task = document.createElement("div");
    task.innerHTML = `
        <input type="radio" class="" />
        <div>
          <p class="task-text">${text}</p>
          <hr />
        </div>
      `;
    task.classList.add("task");
    task.classList.add("menu-btn");
    todoList.insertBefore(task, newTask.nextElementSibling);

    // Clear input field
    newTaskInput.value = "";
    newTask.classList.add("hidden");

    // Add event to delete the task
    const radioButton = task.querySelector("input[type='radio']");
    radioButton.addEventListener("click", () => {
        task.remove();
    });
}

