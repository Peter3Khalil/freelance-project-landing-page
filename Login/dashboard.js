const refresh = document.querySelector('.refresh');
const table = document.querySelector('.table');
const logout = document.querySelector('.logout');
const url = 'https://trynow-api.onrender.com/api/v1/auth';
const formContainer = document.querySelector('.form-container');
const overlay = document.querySelector('.overlay');
const error = document.querySelector('.error');
const changePassword = document.querySelector('.change-password');
const confirmBtn = document.querySelector('.confirmBtn');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
});
changePassword.addEventListener('click', () => {
  formContainer.classList.toggle('hidden');
});
overlay.addEventListener('click', () => {
  formContainer.classList.add('hidden');
});

confirmBtn.addEventListener('click', () => {
  const newPassword = document.querySelector('.new-password').value;
  const confirmPassword = document.querySelector('.confirm-password').value;
  if (newPassword === '' || confirmPassword === '') {
    error.classList.remove('hidden');
    error.classList.remove('success');
    error.textContent = 'Please fill in all fields';
    return;
  }
  if (newPassword !== confirmPassword) {
    error.classList.remove('hidden');
    error.classList.remove('success');
    error.textContent = 'Passwords do not match';
    return;
  }
  changePasswordFunction(newPassword, confirmPassword).then((data) => {
    if (data.status === 200) {
      error.classList.remove('hidden');
      error.classList.add('success');
      error.textContent = 'Password Changed Successfully';
      setTimeout(() => {
        formContainer.classList.add('hidden');
      }, 3000);
    } else {
      error.textContent = 'Invalid Token';
      error.classList.remove('success');    }
  });
});

let deleteBtn;
const createDeleteBtns = (users) => {
  deleteBtn = document.querySelectorAll('.delete');
  deleteBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      console.log(users.data[index]._id);
      deleteUsers(users.data[index]._id).then((data) => {
        if (data.status == 204) {
          window.location.href = '/dashboard.html';
        }
      });
    });
  });
};

const createTable = (users) => {
  if (users.data.length === 0 && !users) {
    table.innerHTML = `<tr>
          <th>Name</th>
          <th>Email</th>
          <th>Delete</th>
        </tr>
        <tr>
          <td>No Data</td>
          <td>No Data</td>
          <td>No Data</td>
        </tr>`;
    return;
  }
  table.innerHTML = `<tr>
          <th>Name</th>
          <th>Email</th>
          <th>Delete</th>
        </tr>
        `;
  users.data.forEach((user) => {
    table.innerHTML += `<tr>
        <td>${user.name}</td>
        <td>
          <a href="mailto:" class="email"> ${user.email} </a>
        </td>
        <td>
          <button class="delete">Delete</button>
        </td>
      </tr>`;
  });
};

// Crud Operations
async function fetchUsers() {
  try {
    const res = await fetch(`${url}/getAll`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    alert('Invalid Token');
  }
}
async function deleteUsers(id) {
  try {
    const res = await fetch(`${url}/deleteUser/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res;
  } catch (error) {
    alert(error.message);
  }
}

async function changePasswordFunction(newPassword, confirmPassword) {
  try {
    const res = await fetch(`${url}/changePassword`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        newPassword,
        confirmPassword,
      }),
    });
    return res;
  } catch (error) {
    alert(error.message);
  }
}

fetchUsers().then((users) => {
  createTable(users);
  createDeleteBtns(users);
});

//**************** */

refresh.addEventListener('click', () => {
  fetchUsers().then((users) => {
    createTable(users);
    createDeleteBtns(users);
  });
});

logout.addEventListener('click', () => {
  window.location.href = '/index.html';
  localStorage.removeItem('token');
});
