const BASEURL = "https://best-book-buddies.onrender.com"

async function getAllTasks() {
    try {
        const response = await fetch(`${BASEURL}/tasks`, {
            method: 'GET',
            headers: {
                'authentication': `Bearer ${localStorage.getItem('taskmanagerToken')}` // Assuming you store the JWT token in localStorage after login
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

function filterTasksByStatus(tasks, status) {
    return tasks.filter(task => task.status === status);
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const status = document.getElementById('status').value;
    const priority = document.getElementById('priority').value;

    try {
        const payload = JSON.stringify({
            title,
            description,
            status,
            priority,
            dueDate,
        })
        console.log(payload);
        const response = await fetch(`${BASEURL}/tasks`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authentication': `Bearer ${localStorage.getItem('taskmanagerToken')}`
            },
            body: payload
        });

        const data = response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        window.location.reload();

    } catch (err) {
        console.error('Error:', err);
    }
}

function handleLogout() {
    localStorage.removeItem("taskmangerToken");
    localStorage.removeItem("taskmangerUser");
    window.location.href = 'login.html';
}

async function editTask(task) {
    let title = document.getElementById('title');
    title.value = task.title;
    let description = document.getElementById('description');
    description.value = task.description;
    let dueDate = document.getElementById('dueDate');
    dueDate.value = task.dueDate.slice(0, 10);
    let status = document.getElementById('status');
    status.value = task.status;
    let priority = document.getElementById('priority');
    priority.value = task.priority;

    const form = document.querySelector('#taskForm');
    form.removeEventListener('submit', handleFormSubmit);
    const btn = document.querySelector('#taskForm > button');
    btn.textContent = 'Update Task';
    form.addEventListener('submit', e => handleUpdateTask(e, task._id));
    console.log(title.value, status.value, dueDate.value)
}

async function handleUpdateTask(e, id) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const status = document.getElementById('status').value;
    const priority = document.getElementById('priority').value;
    const payload = JSON.stringify({
        title,
        description,
        status,
        priority,
        dueDate,
    })
    const response = await fetch(`${BASEURL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authentication': `Bearer ${localStorage.getItem('taskmanagerToken')}`
        },
        body: payload
    });
    const data = response.json();
    // console.log(data);
    alert('Task updated successfully');
    window.location.reload();
}

async function deleteTask(id) {
    const response = await fetch(`${BASEURL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authentication': `Bearer ${localStorage.getItem('taskmanagerToken')}`
        }
    });

    const data = await response.json();
    // console.log(data);
    alert('Task deleted successfully');
    window.location.reload();
}

function renderTasks(tasks, status) {
    let listContainer
    if (status === 'To Do') {
        listContainer = document.querySelector("#todo");
    } else if (status === 'In Progress') {
        listContainer = document.querySelector("#inProgress");
    } else if (status === 'Done') {
        listContainer = document.querySelector("#done");
    } else {
        listContainer = document.querySelector('#filterList')
    }

    listContainer.innerHTML = '';

    tasks.forEach((task) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');


        const title = document.createElement('h3');
        title.textContent = task.title;
        const desctiption = document.createElement('p');
        desctiption.textContent = task.description;
        const status = document.createElement('span');
        status.textContent = task.status;
        const dueDate = document.createElement('span');
        dueDate.textContent = task.dueDate.toString().slice(0, 10);
        const priority = document.createElement('span');
        priority.textContent = task.priority;

        const editBtn = document.createElement('button');
        editBtn.textContent = "Edit";
        editBtn.addEventListener('click', () => {
            editTask(task);
        })
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "DeleteTask";
        deleteBtn.addEventListener('click', () => {
            deleteTask(task._id);
        })

        const taskDetail = document.createElement('div');
        taskDetail.classList.add('task-detail');
        taskDetail.append(status, priority, dueDate)
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('task-buttons')
        btnWrapper.append(editBtn, deleteBtn);

        taskElement.append(title, taskDetail, desctiption, btnWrapper)
        listContainer.append(taskElement);
    })
}


async function filterTaskList() {
    const statusFilter = document.querySelector('#statusFilter').value;
    const priorityFilter = document.querySelector('#priorityFilter').value;
    console.log(statusFilter, priorityFilter)
    let url = `${BASEURL}/tasks/filter?status=${statusFilter}&priority=${priorityFilter}`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'authentication': `Bearer ${localStorage.getItem('taskmanagerToken')}`
        }
    });
    const data = await response.json();
    console.log(data);
    // return data;
    renderTasks(data, "")

}

const statusFilter = document.querySelector('#statusFilter');
statusFilter.addEventListener('change', (e)=>{
    filterTaskList();
})
const priorityFilter = document.querySelector('#priorityFilter');
priorityFilter.addEventListener('change', (e)=>{
    filterTaskList();
});


async function init() {
    const token = localStorage.getItem('taskmanagerToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    document.querySelector('#logoutBtn').addEventListener('click', handleLogout);

    document.querySelector('#taskForm').addEventListener('submit', handleFormSubmit);

    const tasks = await getAllTasks();
    // console.log(tasks);

    const todoTasks = filterTasksByStatus(tasks, 'To Do');
    const inProgress = filterTasksByStatus(tasks, 'In Progress');
    const completedTasks = filterTasksByStatus(tasks, 'Done');




    // const filteredTasks = filterTaskList();

    // renderTasks(filteredTasks, "");

    renderTasks(todoTasks, 'To Do');
    renderTasks(inProgress, 'In Progress');
    renderTasks(completedTasks, 'Done');
    // console.log(todoTasks, inProgress, completedTasks);
}



init();

