const editJobButton = () => {
    const professionElement = document.getElementById('profession');
    const newProfession = prompt('Enter your new profession:');
    
    if (newProfession) {
      const profileId = getUserId();

    fetch(`/api/profile/${profileId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profession: newProfession })
    })
        .then(response => response.json())
        .then(data => {
            professionElement.innerHTML = newProfession;
            console.log('Profession updated successfully!', data);
        })
        .catch(error => {
            console.error('Error updating profession:', error);
          });
}};

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