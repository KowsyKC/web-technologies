const userList = document.getElementById('userList');
const appointmentForm = document.getElementById('appointmentForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

let users = JSON.parse(localStorage.getItem('users')) || [];

function renderUserList() {
  userList.innerHTML = '';
  users.forEach((user, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      Name: ${user.name}
      Email: ${user.email}
      Phone: ${user.phone}
      <button onclick="editUser(${index})">Edit</button>
      <button onclick="deleteUser(${index})">Delete</button>
    `;
    userList.appendChild(listItem);
  });
}

function saveToLocalStorage() {
  localStorage.setItem('users', JSON.stringify(users));
}

function addUser(name, email, phone) {
  users.push({ name, email, phone });
  saveToLocalStorage();
  renderUserList();
}

function editUser(index) {
  const user = users[index];
  nameInput.value = user.name;
  emailInput.value = user.email;
  phoneInput.value = user.phone;

  appointmentForm.removeEventListener('submit', handleSubmit);
  appointmentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    user.name = nameInput.value;
    user.email = emailInput.value;
    user.phone = phoneInput.value;
    saveToLocalStorage();
    renderUserList();
    appointmentForm.reset();
    appointmentForm.removeEventListener('submit', handleSubmit);
    appointmentForm.addEventListener('submit', handleSubmit);
  });
}

function deleteUser(index) {
  users.splice(index, 1);
  saveToLocalStorage();
  renderUserList();
}

function handleSubmit(event) {
  event.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;
  addUser(name, email, phone);
  appointmentForm.reset();
}

renderUserList();
appointmentForm.addEventListener('submit', handleSubmit);