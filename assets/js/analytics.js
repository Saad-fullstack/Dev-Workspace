const totalTask = document.getElementById("analytics-total-task");
const completedTask = document.getElementById("analytics-completed-task");
const totalNotes = document.getElementById("analytics-notes");
const totalFocus = document.getElementById("analytics-focus-time");

const taskProgress = document.getElementById("task-progress");
const roadmapProgress = document.getElementById("roadmap-progress-value");
const focusProgress = document.getElementById("focus-progress");

const taskProgressBar = document.getElementById("task-progress-bar");
const roadmapProgressBar = document.getElementById("roadmap-progress-bar");
const focusProgressBar = document.getElementById("focus-progress-bar");

const summaryTask = document.getElementById("summary-task");
const summaryNote = document.getElementById("summary-note");
const summaryFocus = document.getElementById("summary-focus");
const summaryMessage = document.getElementById("summary-message");

const displayAnalytics = () => {

    const tasks = JSON.parse(localStorage.getItem("newTask")) ?? [];
    const notes = JSON.parse(localStorage.getItem("newNote")) ?? [];
    const roadmap = JSON.parse(localStorage.getItem("roadmap"));

    const completed = tasks.filter(task => task.completed).length;

    // Top Cards
    totalTask.textContent = tasks.length;
    completedTask.textContent = completed;
    totalNotes.textContent = notes.length;
    totalFocus.textContent = "2h 30m";

    // Task Progress
    const taskPercentage =
        tasks.length === 0
            ? 0
            : Math.round((completed / tasks.length) * 100);

    taskProgress.textContent = `${taskPercentage}%`;
    taskProgressBar.style.width = `${taskPercentage}%`;
    taskProgressBar.setAttribute("aria-valuenow", taskPercentage);

    // Roadmap Progress
    const roadmapPercentage = roadmap
        ? Math.min(100, Math.max(0, Number(roadmap.progress)))
        : 0;

    roadmapProgress.textContent = `${roadmapPercentage}%`;
    roadmapProgressBar.style.width = `${roadmapPercentage}%`;
    roadmapProgressBar.setAttribute("aria-valuenow", roadmapPercentage);

    // Focus Progress (Static for now)
    const focusPercentage = 50;

    focusProgress.textContent = `${focusPercentage}%`;
    focusProgressBar.style.width = `${focusPercentage}%`;
    focusProgressBar.setAttribute("aria-valuenow", focusPercentage);

    // Summary
    summaryTask.innerHTML =
        `✔ You completed <strong>${completed}</strong> ${completed === 1 ? "task" : "tasks"}.`;

    summaryNote.innerHTML =
        `✔ You created <strong>${notes.length}</strong> ${notes.length === 1 ? "note" : "notes"}.`;

    summaryFocus.innerHTML =
        `✔ You studied for <strong>2h 30m</strong>.`;

    if (tasks.length === 0) {
        summaryMessage.textContent =
            "🚀 Start by creating your first task.";
    } else if (taskPercentage === 100) {
        summaryMessage.textContent =
            "🏆 Amazing! You completed all your tasks.";
    } else if (taskPercentage >= 50) {
        summaryMessage.textContent =
            "🎯 Great progress! Keep going.";
    } else {
        summaryMessage.textContent =
            "💪 Stay focused and complete more tasks.";
    }

};
window.displayAnalytics = displayAnalytics;

displayAnalytics();