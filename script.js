let userName = localStorage.getItem("userName");
let coins = 0;
let cointext = document.querySelector(".coinText");
let taskName = document.getElementById('userTaskName');
let taskPriority = document.querySelector('.prioritylist');
const modal = document.getElementById('nameModal');
const overlay = document.getElementById('overlay');
const modal2 = document.getElementById('taskModal');
const usernameText = document.querySelector('.userText');
const addTask = document.getElementById('addTask');
let taskListSection = document.querySelector('.listOfTasksSection ul');
let editTask = document.querySelectorAll(".editTak");
let completeTask = document.querySelectorAll(".completeTask");
let totalTasks = document.querySelectorAll(".tasktodo");
let completedTaskSection = document.querySelector(".completedTaskSection ul");
const taskinput = document.getElementById("taskInput");
const clearall = document.querySelector(".clear");


//modal logic start
window.onload = () => {
    if (userName) {
        return;
    } else {
        openModel();
    }
}

function openModel() {
    modal.style.display = "block";
    overlay.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
    location.reload();
}

function saveName() {
    let username = document.getElementById('usernameInput').value;
    if (username) {
        localStorage.setItem("userName", username);
        closeModal();
    }
}
//modal logic end

usernameText.innerText = localStorage.getItem("userName");

//edit task
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("editTask")) {
        const parentTask = event.target.closest("li");
        const rand = parentTask.querySelector('p').innerText;
        console.log(rand);
        openModel2(rand);
        parentTask.classList.add("editingTask"); // Add a temporary class to the task being edited
    }
});

document.getElementById("saveTaskButton").addEventListener("click", () => {
    const changestask = taskinput.value.trim();
    const parentTask = document.querySelector(".editingTask");

    if (parentTask && changestask) {
        let addedtasks = JSON.parse(localStorage.getItem("addedtaskDetails")) || [];
        const oldTaskText = parentTask.querySelector('p').innerText;
        
        // Find the task index and update it in localStorage
        const taskIndex = addedtasks.indexOf(oldTaskText);
        if (taskIndex !== -1) {
            addedtasks[taskIndex] = changestask;
            localStorage.setItem("addedtaskDetails", JSON.stringify(addedtasks));
        }
        
        parentTask.querySelector('p').innerText = changestask;
        parentTask.classList.remove("editingTask");
        modal2.style.display = "none";
        overlay.style.display = "none";
    }
});

function openModel2(val) {
    modal2.style.display = "block";
    overlay.style.display = "block";
    taskinput.value = val;

    // Add a temporary class to the task being edited
    const listItems = document.querySelectorAll("li");
    for (const listItem of listItems) {
        // Find the 'p' tag within the current 'li'.
        const pTag = listItem.querySelector("p");
        
        // Check if a 'p' tag exists and if its text content contains the 'val'.
        if (pTag && pTag.textContent.includes(val)) {
            // Add the 'editingTask' class to the parent 'li' if the text matches.
            listItem.classList.add("editingTask");
            break; // Exit the loop once the matching 'li' is found and modified.
        }
    }
}

function savetask() {
    modal2.style.display = "none";
    overlay.style.display = "none";
    console.log(taskinput.value);
    return taskinput.value;
}

document.getElementById("addTask").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    addTasktolist();
});

document.addEventListener("DOMContentLoaded", loadContents);

addTask.addEventListener("click", addTasktolist);

function addTasktolist() {
    let task = taskName.value.trim();
    let prioritytype = taskPriority.value;
    if (task) {
        let addedtask = JSON.parse(localStorage.getItem("addedtaskDetails")) || [];
        addedtask.push([task, prioritytype]);
        localStorage.setItem("addedtaskDetails", JSON.stringify(addedtask));
        taskName.value = "";
        loadContents();
    }
}

function loadContents() {
    taskListSection.innerHTML = "";
    completedTaskSection.innerHTML = "";
    let addedtasks = JSON.parse(localStorage.getItem("addedtaskDetails")) || [];
    let completedtasks = JSON.parse(localStorage.getItem("completedtaskDetails")) || [];

    addedtasks.forEach((task, index) => {
        const newlist = document.createElement("li");
        newlist.classList.add("tasktodo");
        const spanClassName = task[1] === "urgentTask" ? "urgent" : "normal";
        newlist.innerHTML = `<p class="${spanClassName}">${task[0]}</p>
                        <div class="imgblock">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50" class="editTask">
                                <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50" class="completeTask">
                                <path d="M 11 4 C 7.101563 4 4 7.101563 4 11 L 4 39 C 4 42.898438 7.101563 46 11 46 L 39 46 C 42.898438 46 46 42.898438 46 39 L 46 15 L 44 17.3125 L 44 39 C 44 41.800781 41.800781 44 39 44 L 11 44 C 8.199219 44 6 41.800781 6 39 L 6 11 C 6 8.199219 8.199219 6 11 6 L 37.40625 6 L 39 4 Z M 43.25 7.75 L 23.90625 30.5625 L 15.78125 22.96875 L 14.40625 24.4375 L 23.3125 32.71875 L 24.09375 33.4375 L 24.75 32.65625 L 44.75 9.03125 Z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50" class="deleteTask" fill="red">
                                <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path>
                            </svg>
                        </div>`;
        const del = newlist.querySelector(".deleteTask");
        del.addEventListener("click", () => {
            addedtasks.splice(index, 1);
            localStorage.setItem("addedtaskDetails", JSON.stringify(addedtasks));
            loadContents();
        });
        const com = newlist.querySelector(".completeTask");
        com.addEventListener("click", () => {
            completedtasks.push(task);
            addedtasks.splice(index, 1);
            localStorage.setItem("addedtaskDetails", JSON.stringify(addedtasks));
            localStorage.setItem("completedtaskDetails", JSON.stringify(completedtasks));
            coins = task[1] === "urgentTask" ? coins += 2 : coins += 1;
            localStorage.setItem("coin", JSON.stringify(coins));
            alert(`🎉 Congratulations! 🎉 You’ve successfully completed TASK "${task[0]}"!(${task[1]}) ✅✨ 💰 You now have ${coins} coins! Keep up the great work! 🚀🔥`);
            cointext.innerText = JSON.parse(localStorage.getItem("coin"));
            loadContents();
        });
        taskListSection.appendChild(newlist);
    });

    completedtasks.forEach((task, index) => {
        const newlist = document.createElement("li");
    newlist.classList.add("completedTaskDetail");
    const spanClassName = task[1] === "urgentTask" ? "urgent" : "normal";
    newlist.innerHTML = `<div class="completedlist">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50" class="completeTask" fill="#029435">
                                <path d="M 11 4 C 7.101563 4 4 7.101563 4 11 L 4 39 C 4 42.898438 7.101563 46 11 46 L 39 46 C 42.898438 46 46 42.898438 46 39 L 46 15 L 44 17.3125 L 44 39 C 44 41.800781 41.800781 44 39 44 L 11 44 C 8.199219 44 6 41.800781 6 39 L 6 11 C 6 8.199219 8.199219 6 11 6 L 37.40625 6 L 39 4 Z M 43.25 7.75 L 23.90625 30.5625 L 15.78125 22.96875 L 14.40625 24.4375 L 23.3125 32.71875 L 24.09375 33.4375 L 24.75 32.65625 L 44.75 9.03125 Z"></path>
                                </svg>
                        <p class="${spanClassName}">${task[0]}</p>
                    </div>`;
    completedTaskSection.appendChild(newlist);
    });
}


clearall.addEventListener("click", () => {
    coins = 0;
    taskName.value = "";
    taskListSection.innerHTML = "";
    completedTaskSection.innerHTML = "";
    localStorage.clear();
    location.reload(true);
})
