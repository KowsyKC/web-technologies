/*let tasks = {};
 
//const apiUrl= "https://crudcrud.com/api/fabbc22589d5492ea245cb1d801ffa2e/TASKS";

const addButton = document.getElementById("btn");
addButton.addEventListener("click",function(event) {
    event.preventDefault();
    addToOrder();
});

async function addToOrder() {
    const name = document.getElementById("task").value;
   const description = document.getElementById("Option").value;

   if (name.trim() === "" || description.trim() === "") {
       alert("Task name and description cannot be empty!");
       return;
   }

   document.getElementById("task").value = "";
   document.getElementById("Option").value = "";

   const existingTask = Object.values(tasks).find(task => task.name === name);

   try { 
       if (existingTask) {
           existingTask.description +=description;
           await axios.put(`${apiUrl}/${existingTask._id}`, { name, description:existingTask.description });
           console.log("updated successfully");
       } else {
           const response = await axios.post(apiUrl, { name, description });
           const task = response.data;
           tasks[task._id] = { name: task.name, description: task.description, _id: task._id };
           console.log("added successfully");
       }
       
       displayTableList();
   } catch (error) {
       console.error("Error:", error);
   }
}

async function deleteOrder(id) {
   const confirmDelete = confirm(`Are you sure you want to delete task with ID: ${id}?`);

   if (confirmDelete) {
       try {   
           await axios.delete(`${apiUrl}/${id}`);
           delete tasks[id];
           console.log("deleted successfully");
           displayTableList();
       } catch (error) {
           console.error("Error", error);
       }
   }
}

async function fetchTasks() {
    try {
        const response = await axios.get(apiUrl);
        tasks = response.data.reduce((acc, task) => {
            acc[task._id] = { name: task.name, description: task.description, _id: task._id };
            return acc;
        }, {});
        displayTableList();
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayTableList() {
    const todoList = document.getElementById("todoList");
   todoList.innerHTML = "";    

   for (const id in tasks) {
       const task = tasks[id];

       const listItem = document.createElement("li");
       listItem.innerHTML = `${task.name}: ${task.description}`;
       
       const deleteButton = document.createElement("button");
       deleteButton.textContent = "Delete";
       deleteButton.className = "delete-btn";
      
       deleteButton.addEventListener("click", () => deleteOrder(id));  

       listItem.appendChild(deleteButton);
       todoList.appendChild(listItem);
   }
}

fetchTasks(); */