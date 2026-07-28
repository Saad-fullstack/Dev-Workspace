const taskForm = document.getElementById("task-form")
const taskContainer = document.getElementById("task-list")
const taskModal = document.getElementById("taskModal")

let editIndex = null;

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let taskName = e.target.taskName.value
    let description = e.target.description.value
    let priority = e.target.priority.value
    let dueDate = e.target.dueDate.value

    let task = JSON.parse(localStorage.getItem("newTask")) ?? []
    if (editIndex === null) {
        task.push({
            taskName,
            description,
            priority,
            dueDate,
            completed: false
        })
    } else {
        task[editIndex] = {
            taskName,
            description,
            priority,
            dueDate,
            completed: task[editIndex].completed
        }
        editIndex = null;
    }

    localStorage.setItem("newTask", JSON.stringify(task))
    taskForm.reset();
    formHeading.textContent = "Add Task"
    displayTask();
    const modal = bootstrap.Modal.getOrCreateInstance(taskModal)
    modal.hide();
})

const displayTask = () => {
    let task = JSON.parse(localStorage.getItem("newTask")) ?? []
    let taskHtml = ''

    task.forEach((task, index) => {
        let badgeColor = "";
        switch (task.priority) {
            case "High":
                badgeColor = "text-bg-danger"
                break;

            case "Medium":
                badgeColor = "text-bg-warning";
                break;

            case "Low":
                badgeColor = "text-bg-success";
                break;

            default:
                badgeColor = "text-bg-secondary"
        }

        taskHtml += `
    <div class="card border-0 shadow-sm rounded-4 mb-3 ${task.completed ? "opacity-50" : ""}">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h5 class="fw-semibold mb-2 ${task.completed ? 'text-decoration-line-through' : ''}">
                       ${task.taskName}
                    </h5>
                    <p class="text-secondary mb-3 ${task.completed ? 'text-decoration-line-through' : ''}">
                       ${task.description}
                    </p>
                    <div class="d-flex gap-3 flex-wrap">
                       <span class="badge ${badgeColor}">${task.priority}</span>
                       <small class="text-secondary">Due: ${task.dueDate}</small>
                    </div>
                </div>

                <div class="d-flex gap-2">
                   <button class="btn btn-outline-primary btn-sm edit-btn" data-index="${index}" ${task.completed ? "disabled" : ""}>
                       <i data-lucide="pencil"></i>
                   </button>                       

                   <button class="btn btn-outline-danger btn-sm delete-btn" data-index="${index}">
                   <i data-lucide="trash-2"></i>
                   </button>
                </div>
            </div>

            <div class="form-check mt-4">
               <input class="form-check-input complete-task" data-index="${index}"  ${task.completed ? 'checked' : ''} type="checkbox">
               <label class="form-check-label">
                   Mark as Completed
               </label>
            </div>
        </div>
    </div>
    `
    })
    taskContainer.innerHTML = taskHtml;
    lucide.createIcons();
}

displayTask();

const formHeading = document.getElementById("task-modal-title")

taskContainer.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-btn")
    // Delete task
    if (deleteBtn) {
        let task = JSON.parse(localStorage.getItem("newTask")) ?? []
        const index = Number(deleteBtn.dataset.index)
        console.log(index);
        task.splice(index, 1)
        localStorage.setItem("newTask", JSON.stringify(task))
        displayTask()
    }

    const editBtn = e.target.closest(".edit-btn")
    // Edit task
    if (editBtn) {
        formHeading.textContent = "Edit Task"
        const index = Number(editBtn.dataset.index)
        let task = JSON.parse(localStorage.getItem("newTask")) ?? []
        const selectedTask = task[index]

        taskForm.taskName.value = selectedTask.taskName
        taskForm.description.value = selectedTask.description
        taskForm.priority.value = selectedTask.priority
        taskForm.dueDate.value = selectedTask.dueDate

        const modal = bootstrap.Modal.getOrCreateInstance(taskModal);
        modal.show();
        editIndex = index;
    }
})

// Task after completion
taskContainer.addEventListener("change", (e) => {
    const checkbox = e.target.closest(".complete-task")
    if (!checkbox) return

    const index = Number(checkbox.dataset.index)
    let task = JSON.parse(localStorage.getItem("newTask")) ?? []
    task[index].completed = checkbox.checked;
    localStorage.setItem("newTask", JSON.stringify(task))
    displayTask()

})