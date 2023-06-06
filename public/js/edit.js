const newFormHandler = async (event) => {
    event.preventDefault();

    const profession = document.querySelector('profession').value;
    const location = document.querySelector('location').value;
    const aboutText = document.querySelector('about-text').value;

    // const response = await fetch(`/edit`, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //         profession,
    //         location,
    //         aboutText
    //     }),
    //     headers: {'Content-Type': 'application/json'},
    // });
    // if (response.ok) {
    //     document.location.replace('/profile');
    // } else {
    //     alert("Something wrong!");
    // }
};

document.getElementById('edit-profile').addEventListener('click', editProfile());