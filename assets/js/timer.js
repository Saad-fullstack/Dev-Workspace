const timerDisplay = document.getElementById("timer-display");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

const focusTime = document.getElementById("focus-time");
const breakTime = document.getElementById("break-time");

let totalSeconds = 25 * 60;
let timer = null;
let isRunning = false;

const updateDisplay = () => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

updateDisplay();

startBtn.addEventListener("click", () => {
    if (isRunning) return;
    isRunning = true;

    timer = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            alert("Focus session completed!");
            totalSeconds = Number(focusTime.value) * 60;
            updateDisplay();
        }
    }, 1000);
});

pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
});

resetBtn.addEventListener("click", () => {
    console.log(focusTime);
    clearInterval(timer);
    isRunning = false;
    totalSeconds = Number(focusTime.value) * 60;
    updateDisplay();
});

focusTime.addEventListener("change", () => {
    if (isRunning) return;
    totalSeconds = Number(focusTime.value) * 60;
    updateDisplay();
});