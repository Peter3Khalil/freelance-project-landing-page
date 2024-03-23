const name1 = document.querySelector('#name');
const email = document.querySelector('#email');
const url = 'https://trynow-api.onrender.com/api/v1/auth/signup';
const formContainer = document.querySelector('.form-container');
const overlay = document.querySelector('.overlay');
const error = document.querySelector('.error');
const btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
  formContainer.classList.toggle('hidden');
});

overlay.addEventListener('click', () => {
  formContainer.classList.add('hidden');
});

formContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    name: name1.value,
    email: email.value,
  };
  if (name1.value === '' || email.value === '') {
    alert('Please fill in the form');
    return;
  }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors){
        error.classList.remove('hidden');
        error.textContent = data.errors[0].msg;
        return;
      }
      formContainer.classList.add('hidden');
      window.location.href ="https://gdmtrck.com/?a=230968&c=364894"
    })
    .catch((err) => {
      alert('An error occured');
    });
});
