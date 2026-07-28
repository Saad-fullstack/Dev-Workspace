document.addEventListener("DOMContentLoaded", () => {

    const updateDashboard = () => {
        // Profile Name
        const name = localStorage.getItem("profileName") || "Saad Ahmad";
        const welcome = document.getElementById("welcome-message");
        if (welcome) {
            const hour = new Date().getHours();
            let greeting = "Good Morning";
            if (hour >= 12 && hour < 17) {
                greeting = "Good Afternoon";
            }
            else if (hour >= 17) {
                greeting = "Good Evening";
            }
            welcome.textContent = `${greeting}, ${name} 👋`;
        }

        // Date
        const date = document.getElementById("dashboard-date");
        if (date) {
            date.textContent = new Date()
                .toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                });
        }

        // Tasks
        const tasks =
            JSON.parse(localStorage.getItem("newTask")) || [];

        const total =
            document.getElementById("total-task-count");

        const completed =
            document.getElementById("completed-task-count");

        if (total) {
            total.textContent = tasks.length;
        }

        const completedTasks =
            tasks.filter(task => task.completed).length;

        if (completed) {
            completed.textContent = completedTasks;
        }

        // Dashboard Task List
        const taskContainer =
            document.getElementById("dashboard-task-list");

        if (taskContainer) {
            taskContainer.innerHTML = "";
            tasks.slice(0, 5).forEach(task => {

                taskContainer.innerHTML += `
                <div class="task-item d-flex align-items-center mb-3">
                    <input 
                    class="form-check-input me-3"
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    disabled>
                    <span class="${task.completed ? "text-decoration-line-through" : ""}">
                    ${task.taskName}
                    </span>
                </div>
                `;
            });
        }

        // Notes
        const notes =
            JSON.parse(localStorage.getItem("newNote")) || [];

        const noteCount =
            document.getElementById("notes-count");

        if (noteCount) {
            noteCount.textContent = notes.length;
        }

        const noteContainer =
            document.getElementById("dashboard-note-list");

        if (noteContainer) {
            noteContainer.innerHTML = "";
            notes.slice(0, 3).forEach(note => {
                noteContainer.innerHTML += `
                <div class="note-item mb-3">
                    <h6>${note.noteTitle}</h6>
                    <p class="mb-0 text-muted">
                    ${note.noteContent}
                    </p>
                </div>
                `;
            });
        }

        // Roadmap
        const roadmap =
            JSON.parse(localStorage.getItem("roadmap"));

        if (roadmap) {
            document.getElementById("roadmap-name")
                .textContent = roadmap.title;

            document.getElementById("roadmap-percentage")
                .textContent = roadmap.progress + "%";

            document.getElementById("roadmap-progress")
                .style.width = roadmap.progress + "%";

            document.getElementById("current-milestone")
                .textContent = roadmap.currentMilestone;

            document.getElementById("next-milestone")
                .textContent = roadmap.nextMilestone;
        }
    };

    updateDashboard();

    // Add Task Navigation
    document
        .getElementById("dashboard-add-task")
        ?.addEventListener("click", () => {
            document
                .querySelector('[data-section="tasks-section"]')
                .click();
        });

    document
        .getElementById("quick-add-task")
        ?.addEventListener("click", () => {

            document
                .querySelector('[data-section="tasks-section"]')
                .click();
        });

    document
        .getElementById("quick-add-note")
        ?.addEventListener("click", () => {

            document
                .querySelector('[data-section="notes-section"]')
                .click();
        });

    document
        .getElementById("quick-start-focus")
        ?.addEventListener("click", () => {

            document
                .querySelector('[data-section="timer-section"]')
                .click();
        });

    // Update dashboard whenever section opens
    window.updateDashboard = updateDashboard;
});

// ================= Dashboard Roadmap =================

const updateDashboardRoadmap = () => {

    const roadmap = JSON.parse(localStorage.getItem("roadmap"));

    const roadmapName = document.getElementById("roadmap-name");
    const roadmapPercentage = document.getElementById("roadmap-percentage");
    const roadmapProgress = document.getElementById("roadmap-progress");
    const currentMilestone = document.getElementById("current-milestone");
    const nextMilestone = document.getElementById("next-milestone");

    if (!roadmap) {
        roadmapName.textContent = "No Roadmap";
        roadmapPercentage.textContent = "0%";
        roadmapProgress.style.width = "0%";
        currentMilestone.textContent = "Create your first roadmap.";
        nextMilestone.textContent = "-";
        return;
    }

    roadmapName.textContent = roadmap.title;
    roadmapPercentage.textContent = roadmap.progress + "%";
    roadmapProgress.style.width = roadmap.progress + "%";
    currentMilestone.textContent = roadmap.current;
    nextMilestone.textContent = roadmap.next;
};

updateDashboardRoadmap();

// Make it accessible from other files
window.updateDashboardRoadmap = updateDashboardRoadmap;