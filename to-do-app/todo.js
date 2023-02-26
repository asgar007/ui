let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

// function fetchToDos(){
//     fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         tasks = data.slice(0,10);
//         renderList();
//     })
//     .catch(function(error){
//         console.log("error", error);
//     })
// }
// above code work fine since its promise, but its not Asynchronous, to make it Async we use below code with async, await keyword
async function fetchToDos(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks = data.slice(0,10);
        renderList();
    }
    catch(error){
        console.log("error", error);
    }
}

function addTasksToDOM(task){
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}  class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.svg" class="delete" data-id="${task.id}" />
    `;
    tasksList.append(li);
}

function renderList () {
    tasksList.innerHTML = '';
    for(let i=0; i<tasks.length; i++){
        addTasksToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask (taskId) { // we are toggling the task to done to non done vice versa
    const newTask = tasks.filter(
        (task)=>{
        return task.id === Number(taskId);
    });
    // above func give either item containg array or none
    if(newTask.length > 0){
        const task = newTask[0];
        task.completed = !task.completed; // toggle the boolean
        renderList();
        showNotification('Task Toggled successfully!');
        return;
    }
    else{
        showNotification('Can not toggle Task');
    }
}

function deleteTask (taskId) {
    // const newTask = tasks.filter(function(task){ 
    //     return task.id !== taskId;
    // })
    //below given is equivalent to above, it will make new array and filter out the desired
    const newTask = tasks.filter( 
        (task)=> {
            return task.id !== Number(taskId);
        });
    // copy into main array
    tasks = newTask;
    renderList();
    showNotification('Item deleted successfully!');
}

function addTask (task) {
    if(task){
        // fetch('https://jsonplaceholder.typicode.com/todos', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json',
        //     },
        //     body: JSON.stringify(task),
        // })
        // .then(function(response) {
        //     return response.json();
        // })
        // .then(function(data){
        //     console.log(data);
        //     tasks.push(task);
        //     renderList();
        //     showNotification('Task added successfully');
        // })

        //above code is for POST works with DB since not its fine with below code
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    else{
        showNotification('Task can be added!');
    }
}

function showNotification(text) {
    alert(text);
}

function handleInputKeyPress(e){
    if(e.key === 'Enter'){
        const text = e.target.value;
        if(!text){
            showNotification('Task text can not be empty!')
            return;
        }
        const task = {
            title: text,
            id: Date.now(),
            completed: false
        }
        // after adding make input blank
        e.target.value = '';
        addTask(task);
    }
}

function handleClickListener(e){
    const target = e.target;
    // console.log(target);
    //now handle individual elements

    if(target.className === 'delete'){ // refer to addTaskToDOM comparing based on class name given there
        const taskId = target.dataset.id; // get particular id from data-id given there
        deleteTask(taskId);
        return;
    }
    else if(target.className === 'custom-checkbox'){
        const taskId = target.id; // here dataset is not there coz only id id there refere addTaskToDOM
        toggleTask(taskId);
        return;
    }
    
}

function initializeApp (){
    fetchToDos();
    addTaskInput.addEventListener('keyup', handleInputKeyPress);
    document.addEventListener('click', handleClickListener); // doing event delegation rather individually targeting item 
}
initializeApp();