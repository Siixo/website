const form = document.querySelector(".taskForm");
const taskInput = document.querySelector(".taskInput");
const taskUL = document.querySelector(".taskList");

let taskAll = getTask();
updateTaskList();

form.addEventListener("submit", event => {
    event.preventDefault();
    addTask();
})

function addTask(){
    const taskText = taskInput.value.trim();
    if(taskText.length > 0){
        const taskObject = {
            text: taskText,
            completed: false
        }
        taskAll.push(taskObject);
        updateTaskList();
        save();
        taskInput.value = "";
    }

}

function createTask(taskObject, taskIndex){
    const taskLi = document.createElement("li");
    const taskID = "task" + taskIndex;
    const taskText = taskObject.text;
    taskLi.className = "task";
    taskLi.innerHTML = `<li class="tasks">
                            <input id="${taskID}" type = "checkbox">
                            <label for="${taskID}" class="taskText">${taskText}</label>
                            <button class="delTask"><i class="fa-solid fa-xmark"></i></button>
                        </li>`
    const delBtn = taskLi.querySelector(".delTask");
    delBtn.addEventListener("click", () => {
        deleteTaskItem(taskAll, taskIndex);
    })
    const checkbox = taskLi.querySelector("input");
    checkbox.addEventListener("change", () => {
        taskAll[taskIndex].completed = checkbox.checked;
        save();
    })
    checkbox.checked = taskObject.completed;
    return taskLi;
}

function updateTaskList(){
    taskUL.innerHTML = "";
    taskAll.forEach((task, taskIndex) => {
        taskItem = createTask(task, taskIndex);
        taskUL.append(taskItem);
    })
}

function save(){
    const taskJson = JSON.stringify(taskAll);
    localStorage.setItem("tasks", taskJson);
}

function getTask(){
    const tasks = localStorage.getItem("tasks") || "[]";
    return JSON.parse(tasks);
}

function deleteTaskItem(arr, taskIndex){
    deleteArrayId(arr, taskIndex);
    save();
    updateTaskList();
}

function deleteArrayId(arr, id){
    return arr.splice(id, 1);
}