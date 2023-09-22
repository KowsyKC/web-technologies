const lists =JSON.parse(localStorage.getItem('lists')) ||  {}; // Store orders in memory

function addToOrder() {
    const name = document.getElementById("name").value;
    const desc = document.getElementById("Option").value;
    // Check if the table number already has an order
    if (!lists[name]) {
        lists[name] = [];
    }

    const newTodo = lists[name].push(desc);

    // Update the table list
    displayTableList();
    saveToLocalStorage();
}

function deleteOrder(name) {
    delete lists[name];
    displayTableList();
    saveToLocalStorage();
}


function displayTableList() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";    

    for (const name in lists) {
        const orderList = lists[name];

        const listItem = document.createElement("li");
        listItem.textContent = `${name}: ${orderList}`;
        

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteOrder(name));

        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);

    }
}

function saveToLocalStorage() {
    localStorage.setItem("lists", JSON.stringify(lists));
}
displayTableList();