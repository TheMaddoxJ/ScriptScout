document.addEventListener("click", function() {
    const editAboutButton = document.getElementById("edit-about-button");
    const aboutText = document.getElementById("about-text");
    const profession = decument.getElementById("edit-job-button");
    const location = decument.getElementById("edit-location-button");
    const addProject = document.getElementById("add-project-button");
    const projectList = document.getElementById("project-list");
    

    editAboutButton.addEventListener("click", function() {
        const newAboutText = prompt(`Add your "About me" section`);
        if (newAboutText) {
            aboutText.textContent = newAboutText;
        }
    });

    profession.addEventListener("click", function() {
        const newProfession = prompt("Enter your new profession");
        if (newProfession) {
            profession.textContent = newProfession;
        }
    });

    location.addEventListener("click", function() {
        const newLocation = prompt("Enter your new location");
        if (newLocation) {
            profession.textContent = newLocation;
        }
    });

    // Event listener for adding a new project
    addProject.addEventListener("click", function() {
        const projectName = prompt("Enter the project name:");
        const projectDescription = prompt("Enter the project description:");

        if (projectName && projectDescription) {
            const projectItem = document.createElement("div");
            projectItem.classList.add("project-item");

            const projectNameElement = document.createElement("h4");
            projectNameElement.classList.add("item-title");
            projectNameElement.textContent = projectName;

            const projectDescriptionElement = document.createElement("p");
            projectDescriptionElement.classList.add("item-description");
            projectDescriptionElement.textContent = projectDescription;

            projectItem.appendChild(projectNameElement);
            projectItem.appendChild(projectDescriptionElement);

            projectList.appendChild(projectItem);
        }
    });

    // Event listener for editing a project
    projectList.addEventListener("click", function(event) {
        if (event.target.classList.contains("item-title") || event.target.classList.contains("item-description")) {
            const projectName = event.target.textContent;
            const projectDescription = event.target.nextElementSibling.textContent;

            const newProjectName = prompt("Enter the new project name:", projectName);
            const newProjectDescription = prompt("Enter the new project description:", projectDescription);

            if (newProjectName && newProjectDescription) {
                event.target.textContent = newProjectName;
                event.target.nextElementSibling.textContent = newProjectDescription;
            }
        }
    });
});
