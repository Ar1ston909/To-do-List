const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const renderTasks = () => {
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.textContent = task.text;

        const buttonsDiv = document.createElement('div')
        buttonsDiv.classList.add('for-buttons')

        li.insertBefore(buttonsDiv, li.lastChild)
        list.appendChild(li)

        const completeTask = document.createElement('button');
        completeTask.classList.add('button')
        completeTask.textContent = 'COMPLETED';

        completeTask.addEventListener('click', (event) => {
            event.stopPropagation(); 
            li.classList.add('completed')
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        })

        buttonsDiv.appendChild(completeTask);
        list.appendChild(buttonsDiv);

        const deleteTask = document.createElement('button');
        deleteTask.classList.add('button')
        deleteTask.textContent = 'DELETE';

        deleteTask.addEventListener('click', (event) => {
            event.stopPropagation(); 
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        buttonsDiv.appendChild(deleteTask);
        list.appendChild(buttonsDiv);
    });
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if (text === '') return;

    tasks.push({ text, completed: false });
    input.value = '';
    saveTasks();
    renderTasks();
});

renderTasks();
