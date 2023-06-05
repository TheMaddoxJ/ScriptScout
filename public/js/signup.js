const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const job_title = document.querySelector('#job-title-signup').value.trim();
    const about = document.querySelector('#about-signup').value.trim();

    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            password,
            job_title,
            about,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Something wrong!');
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);