const container = document.querySelector(".tasks tbody")
const from = document.querySelector("#taskForm")
const taskTitle = document.querySelector("#taskForm #taskTitle")
console.log(container)

let tasks = [{
    id: 1,
    title: "frontend Task",
    status:true
},
{
    id: 2,
    title: "backend Task",
    status:false
    }
]

//Read Function
const read = () =>{
    container.innerHTML=""
    tasks.forEach((task) => {
        container.innerHTML += `
            <tr class = "${task.status? "completed" : ""}">
                <td>${task.id}</td>
                <td>${task.title}</td>
                <td><button onclick="editStatus(${task.id})">edit status</button><button onclick="editTitle('${task.id}')">edit title</button><button onclick="deleteTask(${task.id})">delete</button></td>
            </tr>`
    })
}


//Write Function
const add = (e) => {
    e.preventDefault();
    let task = {
        id:tasks[tasks.length-1].id +1,
        title:taskTitle.value,
        status:false
    }
    tasks.push(task)
    taskTitle.value = ""
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
   read()
}

//Modify title
const editTitle = (id) =>{
    tasks = tasks.map((task) =>{
        if(task.id == id){
            let update = prompt("Enter New Title:")
            task.title = update
        }
        return task
    })
   read()
}

//Delete Task:
const deleteTask = (id) =>{
    tasks = tasks.filter((task) => task.id !== id)
    read()
}

from.addEventListener("submit",(e) => add(e))
read()


