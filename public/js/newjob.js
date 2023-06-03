const newJobFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-job-title').value.trim();
    const summary = document.querySelector('#new-job-summary').value.trim();
    const reqs = document.querySelector('#new-job-reqs').value.trim();
    const location = document.querySelector('#new-job-location').value.trim();
    const salary = document.querySelector('#new-job-salary').value.trim();
    const applyLink = document.querySelector('#new-job-url').value.trim();
    
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            summary,
            reqs,
            location,
            salary,
            applyLink
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Something wrong!');
    }
};

document.querySelector('#new-job-form').addEventListener('submit', newJobFormHandler);