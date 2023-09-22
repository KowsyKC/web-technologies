  // Retrieve the users from local storage or initialize an empty array
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Function to render the users in the UI
    function renderUsers() {
      const usersList = document.getElementById('users');
      usersList.innerHTML = '';

      users.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${user.name} - ${user.email}</span> 
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button onclick="deleteUser(${index})">Delete</button>`;
        usersList.appendChild(li);
    });
  }

  // Initial rendering of the user list
  renderUsers();

    // Function to delete a user
    function deleteUser(index) {
      users.splice(index, 1); // Remove the user from the array

      // Update the users in local storage
      localStorage.setItem('users', JSON.stringify(users));

      renderUsers(); // Re-render the updated user list
    }

    document.getElementById('users').addEventListener('click', function(e) {
      if (e.target.classList.contains('edit-btn')) {
        const index = e.target.dataset.index;
        const user = users[index];
    
        const newName = prompt('Enter the new name:', user.name);
        const newEmail = prompt('Enter the new email:', user.email);
    
        if (newName && newEmail) {
          user.name = newName;
          user.email = newEmail;
          localStorage.setItem('users', JSON.stringify(users));
          renderUsers();
        }
      }
    });

  const form = document.getElementById('my-form');

  // Listen for the form submission event
  form.addEventListener('submit', function(event) {
    // Prevent the form from submitting
    event.preventDefault(); 

    // Get the input values
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
  
    // Get the values entered by the user
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
  
    // Validate the input fields
    if (!isValidName(name)) {
      displayErrorMessage('Please enter a valid name.');
      return;
    }
  
    if (!isValidEmail(email)) {
      displayErrorMessage('Please enter a valid email address.');
      return;
    }
  
    if (!isValidPassword(password)) {
      displayErrorMessage('Please enter a valid password (at least 6 characters).');
      return;
    }

    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
      password:passwordInput.value
    };

    users.push(newUser); // Add the new user to the array

    // Update the users in local storage
    localStorage.setItem('users', JSON.stringify(users));
  
    renderUsers(); // Re-render the updated user list
    // Reset the form
    form.reset();
  });

    // Function to validate the name field
    function isValidName(name) {
        // Name should not be empty and should contain only alphabetic characters
        const nameRegex = /^[a-zA-Z]+$/;
        return name !== '' && nameRegex.test(name);
    }
  
    // Function to validate the email field
    function isValidEmail(email) {
        // Email should not be empty and should be a valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email !== '' && emailRegex.test(email);
    }
    
    // Function to validate the password field
    function isValidPassword(password) {
        // Password should have at least 6 characters
        return password.length >= 6;
    }
    
    // Function to display error message
    function displayErrorMessage(message) {
        const errorDiv = document.querySelector('.msg');
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
    }
    
    // Function to display success message
    function displaySuccessMessage(message) {
        const successDiv = document.querySelector('.msg');
        successDiv.textContent = message;
        successDiv.style.color = 'green';
    }
