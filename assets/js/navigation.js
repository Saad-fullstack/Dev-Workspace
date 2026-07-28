const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".sidebar-overlay");

if (menuBtn && sidebar && overlay) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("show");
        overlay.classList.toggle("show");
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
    });
}

const sidebarLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll(".content-section")
const pageTitle = document.getElementById("page-title")

sidebarLinks.forEach((link) => {

    link.addEventListener("click", () => {
        const sectionId = link.dataset.section;
        const selectedSection = document.getElementById(sectionId)

        // hide sections
        sections.forEach(section => {
            section.classList.add("d-none")
        })

        // remove active class
        sidebarLinks.forEach((sidebarLink) => {
            sidebarLink.classList.remove("active")
        })

        selectedSection.classList.remove("d-none")
        link.classList.add("active")
        pageTitle.textContent = link.textContent
        if (sectionId === "dashboard-section" && typeof updateDashboard === "function") {
            updateDashboard();
        }

        localStorage.setItem("activeSection", sectionId);

        if (sectionId === "analytics-section") {
            window.displayAnalytics();
        }
    })
})

// Restore last opened section after refresh
const savedSection =
    localStorage.getItem("activeSection") || "dashboard-section";

const savedLink = document.querySelector(
    `[data-section="${savedSection}"]`
);

if (savedLink) {
    savedLink.click();
}