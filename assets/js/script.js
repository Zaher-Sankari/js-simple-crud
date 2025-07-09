const container = document.querySelector(".tasks tbody")
const from = document.querySelector("#taskForm")
const taskTitle = document.querySelector("#taskForm #taskTitle")
console.log(container)

let tasks = JSON.parse(localStorage.getItem("tasks")) || []
let lastId = tasks[tasks.length-1].id
console.log(lastId);
const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

//Read Function
const read = () =>{
    container.innerHTML=""
    tasks.forEach((task,index) => {
        task.count = index +1
        container.innerHTML += `
            <tr class = "${task.status? "completed" : ""}">
                <td>${task.count}</td>
                <td>${task.id}</td>
                <td>${task.title}</td>
                <td><button onclick="editStatus(${task.id})">edit status</button><button onclick="editTitle('${task.id}')">edit title</button><button onclick="deleteTask(${task.id})">delete</button></td>
            </tr>`
    })
    saveTasks()
}

//Write Function
const add = (e) => {
    e.preventDefault();
    if(taskTitle.value !== ""){
        let task = {
            count:tasks.length +1,
            id:lastId+1,
            title:taskTitle.value,
            status:false
        }
        tasks.push(task)
        taskTitle.value = ""
        lastId++;
        console.log(lastId);
    }
    else{
        alert("Please Insert a Valid title")
    }
    saveTasks()
    read()
}

//Modify status
const editStatus = (id) =>{
    let updatedTask = tasks.find((task) =>{return task.id == id})
    updatedTask.status = !updatedTask.status

    tasks = tasks.map((task) =>{
        if(task.id == id){
            task = updatedTask
        }
        return task
    })
    saveTasks()
    read()
}

//Modify title
const editTitle = (id) =>{
    tasks = tasks.map((task) =>{
        if(task.id == id){
            let update = prompt("Enter New Title:")
            if(update === "" || !update){
                update = task.title
            }
            else{
                task.title = update
            }
        }
        return task
    })
    saveTasks()
    read()
}

//Delete Task:
const deleteTask = (id) =>{
    tasks = tasks.filter((task) => task.id !== id)
    saveTasks()
    read()
}

from.addEventListener("submit",(e) => add(e))
read()


