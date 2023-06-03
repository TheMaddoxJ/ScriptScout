const logoutHandler = async () => {
  const response = await fetch ('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
      document.location.replace('/');
      alert ('You have logged out!')
  } else {
      alert ('Failed to log out!')
  }
};

document.querySelector('#logout-btn').addEventListener('click', logoutHandler);