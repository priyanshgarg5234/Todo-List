let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


/* Adding task to list */
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
          <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}  class="custom-checkbox">
          <label for="${task.id}">${task.title}</label>
          <img src="trash.svg" class="delete" data-id="${task.id}" />
    `;
    taskList.append(li);
}

/* Updating List */
function renderList(filteredTasks = tasks) {
    taskList.innerHTML = '';

    if(filteredTasks.length ===0){
        const noTasksMessage = document.createElement('li');
        noTasksMessage.innerHTML = '<span style="color: gray;">No Task Available</span>';
        taskList.appendChild(noTasksMessage);
    }else{
        for (let i = 0; i < filteredTasks.length; i++) {
            addTaskToDOM(filteredTasks[i]);
        }
    }
    tasksCounter.innerHTML = filteredTasks.length;
}

/* Check Task */
function toggleTask(taskId) {
    const task = tasks.filter(function (task) {
        return task.id == Number(taskId);
    });
    if (task.length > 0) {
        const currTask = task[0];
        currTask.completed = !currTask.completed;
        renderList();
        showNotification('Task toggle successfuly');
        return;
    }
    showNotification("could not toggle the task");
}

/* Delete Single Task */
function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id !== Number(taskId);
    });
    tasks = newTasks;
    renderList();
    showNotification("task deleted successfully")
}

/* Add New Task */
function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList();
        showNotification("task added successfully");
        return;
    }
    showNotification("task can not be added")
}

/* Check All Task */
function completeAllTasks() {
    const allCompleted = tasks.every(task => task.completed);
    tasks.forEach(task => (task.completed = !allCompleted));
    renderList();
    const message = allCompleted ? "Marked all tasks as incomplete" : "Marked all tasks as complete";
    showNotification(message);
}

/* Delete All Task */
function deleteAllTasks() {
    tasks = [];
    renderList();
    showNotification("All tasks deleted");
}

/* Generate alert */
function showNotification(text) {
    alert(text);
}

/* ALL, COMPLETED And UNCOMPLETED FILTER */
function filterTasks(status) {
    const filteredTasks = status === 'all'
        ? tasks
        : tasks.filter(task => status === 'completed' ? task.completed : !task.completed);
    renderList(filteredTasks);
}

/* Handle input through Keyboard */
function handleInputKeypress(e) {
    if (e.key == 'Enter') {
        const text = e.target.value;

        if (!text) {
            showNotification("Task text can not be empty")
            return;
        }

        const task = {
            title: text,
            id: Date.now(),
            completed: false
        }

        e.target.value = '';
        addTask(task);
    }
}

/* Handle Mouse Click */
function handleClickListner(e) {
    const target = e.target;
    if (target.className == 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.className == 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
        return;
    } else if (target.className == 'complete-all') {
        completeAllTasks();
        return;
    } else if (target.id == 'delete-all') {
        deleteAllTasks();
        return;
    } else if (target.id == 'filter-all') {
        filterTasks('all');
        return;
    }
    else if (target.id == 'filter-completed') {
        filterTasks('completed')
        return;
    }
    else if (target.id == 'filter-uncompleted') {
        filterTasks('uncompleted')
        return;
    }
}


function initializeApp() {
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickListner);
}

initializeApp();


