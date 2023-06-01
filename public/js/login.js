const loginFormHandler = async (event) => {
  event.preventDefault();

  const usernameEl = document.querySelector("#username-login");
  const passwordEl = document.querySelector("#password-login");
  const loggedIn = false;

  const response = await fetch ('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
          email: usernameEl.value,
          password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
      document.location.replace('/');
      loggedIn = true;

  } else {
      alert('Something went wrong!')
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);