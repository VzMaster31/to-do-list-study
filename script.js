function addTask() {
    // make variable taskInput to get element input by id
    const taskInput = document.getElementById('taskInput');

    // get value from taskInput and remove clean unwanted space
    // using trim method and then assign to variable tasktext
    const taskText = taskInput.value.trim();

    // condition if tasktext or value that we get from input field
    // to ensure that isnt nothing
    if (taskText !== '') {
        // make variable taskList to get element list by id
        const taskList = document.getElementById('taskList');

        // create element li using createElement method
        // and then assign it to variable li
        const li = document.createElement('li');

        // set li content using textContent property to taskText
        li.textContent = taskText;

        // add it to taskList using appendChild method
        taskList.appendChild(li);

        // call function saveTasksToLocalStorage to store the task
        // in the local storage
        saveTasksToLocalStorage(taskText);

        // set taskInput or input field to nothing
        taskInput.value = '';
    } else {
        alert('Please enter a task before adding it to the list.');
    }
}

function saveTasksToLocalStorage(taskText) {
    // make variable tasks and then assign value
    // getItem() is used to get value assosiate with 'tasks'
    // from localStorage. but it return string so we converse
    // that using JSON.parse to array of tasks
    // the || [] means if the storage is empty (null) then provide
    // [] or empty array for default value if there are no tasks 
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (taskText !== '') {
        tasks.push(taskText);    
    }

    if (tasks.length === 0) {
        localStorage.removeItem('tasks');
    } else {
        // we store the updated array into the localStorage using
        // setItem method under the key 'tasks' but because the
        //localStorage can only store string, we convert the array
        //to string using JSON.stringify and then store it
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
    

function loadTasksFromLocalStorage() {

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    tasks.forEach(taskText => {
        const li = createTaskElement(taskText);
        taskList.appendChild(li);
    });
}

function createTaskElement(taskText) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.classList.add('task-text');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteButton);

    // Add event listener to the checkbox
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            taskSpan.classList.add('done');
        } else {
            taskSpan.classList.remove('done');
        }
    });

    // Add event listener to delete button
    deleteButton.addEventListener('click', function () {
        li.remove();
        removeTaskFromLocalStorage(taskText);
    });

    return li;
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // find the index of the task in the tasks array
    const index = tasks.indexOf(taskText);

    // if the task is found in the array, remove it
    if (index !== -1) {
        tasks.splice(index, 1)
    }

    // update the local storage with the update tasks array
    if (tasks.length === 0) {
        localStorage.removeItem('tasks');
    } else {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

loadTasksFromLocalStorage();