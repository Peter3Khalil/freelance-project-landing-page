const form = document.querySelector('form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const url = 'https://trynow-api.onrender.com/api/v1/auth/login';
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (email.value === '' || password.value === '') {
    alert('Please fill in all fields');
  } else {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.token === undefined) return alert('Invalid Credentials');
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard.html';
      })
      .catch((err) => alert('Invalid Credentials'));
  }
});
