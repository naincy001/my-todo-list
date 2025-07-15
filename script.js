const taskInput = document.getElementById('task-input');
        const taskList = document.getElementById('task-list');
        const todoForm = document.getElementById('todo-form');

        function getTasks() {
            return JSON.parse(localStorage.getItem('tasks')) || [];
        }

        function saveTasks(tasks) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function renderTasks() {
            const tasks = getTasks();
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="task-text">${task}</span>
                    <button class="edit" onclick="editTask(${index})">Edit</button>
                    <button class="delete" onclick="deleteTask(${index})">Delete</button>
                `;
                taskList.appendChild(li);
            });
        }

        function addTask(task) {
            const tasks = getTasks();
            tasks.push(task);
            saveTasks(tasks);
            renderTasks();
        }

        function editTask(index) {
            const tasks = getTasks();
            const newTask = prompt('Edit the task:', tasks[index]);
            if (newTask !== null) {
                tasks[index] = newTask;
                saveTasks(tasks);
                renderTasks();
            }
        }

        function deleteTask(index) {
            const tasks = getTasks();
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
        }

        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const task = taskInput.value.trim();
            if (task) {
                addTask(task);
                taskInput.value = '';
            }
        });

        // Initial render
        renderTasks();