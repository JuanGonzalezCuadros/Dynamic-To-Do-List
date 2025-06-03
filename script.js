const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const searchBar = document.getElementById('searchBar');

let tasks = [];

function updateTaskCount() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    taskCount.textContent = `${completedTasks} of ${totalTasks} tasks completed`;
}

//Add Task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Enter task');
        return;
    }

    const taskId = `task-${Date.now()}`;
        const newTask = {
            id: taskId,
            text: taskText,
            completed: false
        };
    tasks.push(newTask);

    const taskItem = document.createElement('li');
    taskItem.setAttribute('id', taskId);
    taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox" />
        <span>${taskText}</span>
        <button class="delete-button">Delete</button>
    `;
    taskList.appendChild(taskItem);
    taskInput.value = '';
    updateTaskCount();
}

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

//Task Completed
function toggleTaskCompletion(e) {
    const taskId = e.target.closest('li').id;
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        task.completed = e.target.checked;
        const taskText = e.target.nextElementSibling;

        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
        } else {
            taskText.style.textDecoration = 'none';
        }

        updateTaskCount();
    }
}
taskList.addEventListener('change', (e) => {
    if (e.target.classList.contains('task-checkbox')) {
        toggleTaskCompletion(e);
    }
});

//Delete Task
function deleteTask(e) {
    const taskId = e.target.closest('li').id;
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        e.target.closest('li').remove();
    }

    updateTaskCount();
}
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button')) {
        deleteTask(e);
    }
});

//Search Task
function filterTasks() {
    const searchTerm = searchBar.value.toLowerCase();

    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm)
    );

    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.setAttribute('id', task.id);
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} />
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.text}</span>
            <button class="delete-button">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });

    updateTaskCount();
}
searchBar.addEventListener('input', filterTasks);
