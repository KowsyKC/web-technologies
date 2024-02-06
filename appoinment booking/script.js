let users = {};
 
const apiUrl= "https://crudcrud.com/api/ebe9825500204d5890fb2ce664c8eb6b/list";

const addButton = document.getElementById("btn");
addButton.addEventListener("click",function(event) {
    event.preventDefault();
    addToAppoinment();
});

async function addToAppoinment() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

 if (name.trim() === "" || email.trim() === "" || phone.trim()==="") {
     alert("User name and details cannot be empty!");
     return;
 }

 document.getElementById("name").value = "";
 document.getElementById("email").value = "";
 document.getElementById("phone").value = "";

 const existingUser = Object.values(users).find(user => user.name === name);

 try { 
     if (existingUser) {
         existingUser.email = `${email}`;
         existingUser.phone = `${phone}`;

         await axios.put(`${apiUrl}/${existingUser._id}`, { name, email, phone});
         console.log("updated successfully");
     } else {
         const response = await axios.post(apiUrl, { name, email, phone });
         const user= response.data;

         users[user._id] = { name: user.name, email: user.email, phone: user.phone, _id: user._id };
         console.log("added successfully");
     }
     
     displayUserList();
 } catch (error) {
     console.error("Error:", error);
 }
}

function editUser(id) {
  const user = users[id];

const appointmentForm = document.getElementById('appointmentForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

  // Populate the form with user details
  nameInput.value = user.name;
  emailInput.value = user.email;
  phoneInput.value = user.phone;

   // Update the form submit event for editing
   appointmentForm.onsubmit = function(event) {
    event.preventDefault();

    const newName = nameInput.value;
    const newEmail = emailInput.value;
    const newPhone = phoneInput.value;

    if (newName && newEmail && newPhone) {
      // Update user details
      user.name = newName;
      user.email = newEmail;
      user.phone = newPhone;

      // Save to local storage, render the updated list, and reset the form
     // saveToLocalStorage();
      fetchUsers();
      appointmentForm.reset();
    } else {
      // Display an error message for incomplete input
      alert('Please fill out all fields.');
    }
  };
}

async function deleteUser(id) {
  const confirmDelete = confirm(`Are you sure you want to delete task with ID: ${id}?`);

  if (confirmDelete) {
      try {   
          await axios.delete(`${apiUrl}/${id}`);
          delete users[id];
          console.log("deleted successfully");
          displayUserList();
      } catch (error) {
          console.error("Error", error);
      }
  }
}

async function fetchUsers() {
  try {
      const response = await axios.get(apiUrl);
      users = response.data.reduce((acc, user) => {
          acc[user._id] = { name: user.name, email: user.email, phone:user.phone, _id: user._id };
          return acc;
      }, {});

      displayUserList();
  } catch (error) {
      console.error("Error:", error);
  }
}

function displayUserList() {
  const userList = document.getElementById('userList');
  userList.innerHTML = "";
  
 for (const id in users) {
    const user = users[id];
    
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>Name:</span> ${user.name}
      <span>Email:</span> ${user.email}
      <span>Phone:</span> ${user.phone}`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-btn";

      deleteButton.addEventListener("click", () => deleteUser(id));

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "edit-btn";

      editButton.addEventListener("click", () => editUser(id));

       listItem.appendChild(deleteButton);
       listItem.appendChild(editButton);
       userList.appendChild(listItem);
  }
} 

fetchUsers();
