const getStartedBtn = document.querySelectorAll(".get-started-btn")

getStartedBtn.forEach((button) => {
    button.addEventListener("click", () => {
        window.location.href = "dashboard.html"
    })
})