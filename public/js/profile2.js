const editJobButton = async (event) => {
    event.preventDefault();

    const professionElement = document.getElementById('profession');
    const editJobButton = document.getElementById('edit-job-button');
    const profileId = sessionStorage.getItem(id);

    editJobButton.addEventListener('click', () => {
        professionElement.innerHTML = `<input id="edit-profession" type="text" value="${professionElement.textContent}"> <input type=button onClick="location.href="/${profileId}"
        value='Save'>`;

        const editProfessionInput = document.getElementById('edit-profession');
        editProfessionInput.focus()

        const newProfession = document.querySelector('#profession').value.trim();

        const response = fetch(`/api/profile/${profileId}`, {
            method: 'PUT',
            body: JSON.stringify({
                profession: newProfession
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
        document.location.replace(`/profile/${profileId}`);
            } else {
                alert('Something is wrong!');
            };}
        )};
      
        // editProfessionInput.addEventListener('blur', () => {
        //   const newProfession = editProfessionInput.value;
        //   const profileId = sessionStorage.getItem(id);

    // document.getElementById('save-button');addEventListener('click', () => {
    //     fetch(`/api/profile/${profileId}`, {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ profession: newProfession })
    //     })
    // .then(response => response.json())
    // .then(data => {
    //         professionElement.innerHTML = newProfession;
    //         console.log('Profession updated successfully!', data);
    //     })
    //     .catch(error => {
    //         console.error('Error updating profession:', error);
    //       });
    //     })});

const editLocation = () => {
    const locationElement = document.getElementById('location');
    const newLocation = prompt('Enter your new Location')

    if (newLocation) {
        const profileId = getUserId();
  
      fetch(`/api/profile/${profileId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ location: newLocation })
      })
          .then(response => response.json())
          .then(data => {
              locationElement.innerHTML = newLocation;
              console.log('Location updated successfully!', data);
          })
          .catch(error => {
              console.error('Error updating Location:', error);
            });
}};

const editAbout = () => {
    const aboutElement = document.getElementById('about-text');
    const newAbout = prompt('Update your About me section')

    if (newAbout) {
        const profileId = getUserId();
  
      fetch(`/api/profile/${profileId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ about: newAbout })
      })
          .then(response => response.json())
          .then(data => {
              aboutElement.innerHTML = newAbout;
              console.log('About me updated successfully!', data);
          })
          .catch(error => {
              console.error('Error updating About me:', error);
        });
}};

document.getElementById('edit-job-button').addEventListener('click', editJobButton);
document.getElementById('edit-location-button').addEventListener('click', editLocation);
document.getElementById('edit-about-button').addEventListener('click', editAbout);