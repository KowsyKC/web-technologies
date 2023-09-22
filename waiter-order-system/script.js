const orders =JSON.parse(localStorage.getItem('orders')) ||  {}; // Store orders in memory

    function addToOrder() {
        const tableNumber = document.getElementById("tableNumber").value;
        const dish = document.getElementById("dishOptions").value;
        // Check if the table number already has an order
        if (!orders[tableNumber]) {
            orders[tableNumber] = [];
        }

        orders[tableNumber].push(dish);

        // Send data to the backend (replace with your API endpoint)
        fetch('"https://crudcrud.com/api/aef40d4db63c458bbdd415815681f77c/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orders),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the backend if needed
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // Update the table list
        displayTableList();
        saveToLocalStorage();
    }

    function deleteOrder(tableNumber) {
        delete orders[tableNumber];
        displayTableList();
        saveToLocalStorage();
    }


    function displayTableList() {
        const tableList = document.getElementById("tableList");
        tableList.innerHTML = "";    

        for (const tableNumber in orders) {
            const orderList = `${orders[tableNumber]} , `;
            const listItem = document.createElement("li");
            listItem.textContent = `Table ${tableNumber}: ${orderList}`;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteOrder(tableNumber));

            listItem.appendChild(deleteButton);
            tableList.appendChild(listItem);
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem("orders", JSON.stringify(orders));
    }
    displayTableList();