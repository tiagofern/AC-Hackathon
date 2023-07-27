var API_URL = "http://localhost:8080/javabank5/api/customer";


window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    document.getElementById("special").addEventListener("change", event => {
        agents.special = event.target.value;
    });

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })

    
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};






////////////////
//////////////
///////////
////////
//////
////
///
//

let agents = JSON.parse(localStorage.getItem("agents")) || [];

function saveToLocalStorage() {
    localStorage.setItem("agents", JSON.stringify(agents));
}

function displayAgent(agent) {
    const tableBody = document.getElementById("agents-table-body");
    const row = document.createElement("tr");

    const imgCell = document.createElement("td");
    const img = document.createElement("img");
    img.src = agent.photo;
    img.width = 200;
    img.height = 200;
    imgCell.appendChild(img);
    row.appendChild(imgCell);

    const nameCell = document.createElement("td");
    nameCell.innerText = agent.name;
    row.appendChild(nameCell);

    const ageCell = document.createElement("td");
    ageCell.innerText = agent.age;
    row.appendChild(ageCell);

    const mission = document.createElement("td");
    mission.innerText = agent.mission;
    row.appendChild(mission);

    const special = document.createElement("td");
    special.innerText = agent.special;
    row.appendChild(special);

    const actionsCell = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.innerText = "View or Edit";
    editBtn.classList.add("btn", "btn-warning", "mr-2");
    editBtn.onclick = () => editAgent(agent);
    actionsCell.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.onclick = () => deleteAgent(agent);
    actionsCell.appendChild(deleteBtn);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
}

function editAgent(agent) {
    document.getElementById("agent-name").value = agent.name;
    document.getElementById("agent-age").value = agent.age;
    document.getElementById("mission").value = agent.mission;
    document.getElementById("special").value = agent.special;

    const agentPhoto = document.getElementById("agent-photo");
    agentPhoto.value = "";

    const agentPhotoPreview = document.getElementById("agent-photo-preview");
    agentPhotoPreview.src = agent.photo;
    agentPhotoPreview.style.display = "block";

    agentPhoto.onchange = () => {
        readFile(agentPhoto.files[0]).then(dataUrl => {
            agentPhotoPreview.src = dataUrl;
        });
    };

    agentBeingEdited = agent;
    //showForm();


    showForm(false);
}


function deleteAgent(agent) {
    agents = agents.filter(a => a !== agent);
    saveToLocalStorage();
    updateUI();
}

function showForm() {
    document.getElementById("agents-list").style.display = "none";
    document.getElementById("add-agent-form").style.display = "block";
}

function hideForm() {
    document.getElementById("agents-list").style.display = "block";
    document.getElementById("add-agent-form").style.display = "none";
}

function updateUI() {
    const tableBody = document.getElementById("agents-table-body");
    tableBody.innerHTML = "";
    agents.forEach(displayAgent);
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

//document.getElementById("add-agent-btn").onclick = showForm;

document.getElementById("add-agent-btn").onclick = () => showForm(true);


document.getElementById("cancel-btn").onclick = hideForm;

document.querySelector("#add-agent-form form").onsubmit = async event => {
    event.preventDefault();

    const agentPhoto = document.getElementById("agent-photo").files[0];
    const agentName = document.getElementById("agent-name").value;
    const agentAge = document.getElementById("agent-age").value;
    const mission = document.getElementById("mission").value;
    const special = document.getElementById("special").value;

    const agent = {
        photo: agentPhoto ? await readFile(agentPhoto) : "",
        name: agentName,
        age: agentAge,
        mission: mission,
        special: document.getElementById("special").value,
    };

    if (agentBeingEdited) {
        if (agentPhoto) {
            agentBeingEdited.photo = agent.photo;
        }
        agentBeingEdited.name = agent.name;
        agentBeingEdited.age = agent.age;
        agentBeingEdited.mission = agent.mission;
        agentBeingEdited.special = agent.special;
        agentBeingEdited = null;
    } else {
        agents.push(agent);
    }

    saveToLocalStorage();
    updateUI();
    hideForm();
};

let agentBeingEdited = null;
updateUI();

function resetForm() {
    document.getElementById("agent-name").value = "";
    document.getElementById("agent-age").value = "";
    document.getElementById("mission").value = "";
    document.getElementById("special").value = "";
    const agentPhoto = document.getElementById("agent-photo");
    agentPhoto.value = "";
    const agentPhotoPreview = document.getElementById("agent-photo-preview");
    agentPhotoPreview.src = "";
    agentPhotoPreview.style.display = "none";
}

function showForm(reset = true) {
    if (reset) {
        resetForm();
    }
    document.getElementById("agents-list").style.display = "none";
    document.getElementById("add-agent-form").style.display = "block";
}

