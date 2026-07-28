const darkModeToggle = document.getElementById("dark-mode-toggle");


// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) {
        darkModeToggle.checked = true;
    }
}

// Toggle Dark Mode
if (darkModeToggle) {
    darkModeToggle.addEventListener("change", () => {

        if (darkModeToggle.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem(
                "theme",
                "dark"
            );
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem(
                "theme",
                "light"
            );
        }
    });
}


// Profile Name
const profileInput = document.getElementById("profile-name");
const saveProfileBtn = document.getElementById("save-profile");
const topbarProfileNames = document.querySelectorAll(".profile-name");

// Load saved profile name
const savedName = localStorage.getItem("profileName");
if (savedName) {
    profileInput.value = savedName;
    topbarProfileNames.forEach((name) => {
        name.textContent = savedName;
    });
}

// Save profile name
saveProfileBtn.addEventListener("click", () => {
    const name = profileInput.value.trim();
    if (name !== "") {
        // Save in Local Storage
        localStorage.setItem("profileName", name);

        // Update topbar name instantly
        topbarProfileNames.forEach((profile) => {
            profile.textContent = name;
        });
        alert("Profile updated successfully!");
    }
});

// Clear all Data
const clearData = document.getElementById("clear-data");

if (clearData) {
    clearData.addEventListener(
        "click",
        () => {
            const confirmation =
                confirm(
                    "Are you sure you want to delete all workspace data?"
                );

            if (confirmation) {
                localStorage.clear();
                alert(
                    "All data has been removed!"
                );
                location.reload();
            }
        }
    );
}

const themeButton = document.querySelector(".theme-btn");

if (themeButton) {
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        }
        else {
            localStorage.setItem("theme", "light");
        }
        darkModeToggle.checked =
            document.body.classList.contains("dark-mode");
    });
}

const currentName = localStorage.getItem("profileName");

if (currentName) {

    document.querySelectorAll(".profile-name").forEach((item) => {
        item.textContent = currentName;
    });

}