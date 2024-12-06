document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginPage = document.getElementById("login-page");
    const todoPage = document.getElementById("todo-page");
    const loginError = document.getElementById("login-error");

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const addTaskBtn = document.getElementById("add-task-btn");
    const newTaskInput = document.getElementById("new-task");
    const todoList = document.getElementById("todo-list");

    const validCredentials = { username: "user", password: "password123" };

    // Login functionality
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === validCredentials.username && password === validCredentials.password) {
            loginPage.classList.add("hidden");
            todoPage.classList.remove("hidden");
        } else {
            loginError.textContent = "Invalid username or password!";
        }
    });

    // Add task functionality
    addTaskBtn.addEventListener("click", () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            addTaskToList(taskText);
            newTaskInput.value = "";
        }
    });

    // Function to add tasks to the list
    function addTaskToList(taskText) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="task-actions">
                <button class="edit-task-btn">Edit</button>
                <button class="delete-task-btn">Delete</button>
            </div>
        `;

        // Add edit functionality
        taskItem.querySelector(".edit-task-btn").addEventListener("click", () => {
            const taskTextSpan = taskItem.querySelector(".task-text");
            const currentText = taskTextSpan.textContent;

            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = currentText;
            taskItem.replaceChild(editInput, taskTextSpan);

            const saveBtn = taskItem.querySelector(".edit-task-btn");
            saveBtn.textContent = "Save";

            // Save the edited task
            saveBtn.addEventListener("click", () => {
                const newText = editInput.value.trim();
                if (newText) {
                    taskTextSpan.textContent = newText;
                    taskItem.replaceChild(taskTextSpan, editInput);
                    saveBtn.textContent = "Edit";
                }
            });
        });

        // Add delete functionality
        taskItem.querySelector(".delete-task-btn").addEventListener("click", () => {
            taskItem.remove();
        });

        todoList.appendChild(taskItem);
    }
});
