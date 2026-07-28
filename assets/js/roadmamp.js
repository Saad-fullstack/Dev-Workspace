const roadmapForm = document.getElementById("roadmap-form");
const roadmapCard = document.getElementById("roadmap-card");
const emptyRoadmap = document.getElementById("empty-roadmap");
const roadmapModal = document.getElementById("roadmapModal");
const roadmapModalTitle = document.getElementById("roadmap-modal-title");


roadmapForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const roadmap = {
        title: roadmapForm.roadmapTitle.value,
        progress: roadmapForm.roadmapProgress.value,
        current: roadmapForm.currentMilestone.value,
        next: roadmapForm.nextMilestone.value
    };

    localStorage.setItem("roadmap", JSON.stringify(roadmap));
    roadmapForm.reset();
    roadmapModalTitle.textContent = "Add Roadmap";
    displayRoadmap();
    bootstrap.Modal.getOrCreateInstance(roadmapModal).hide();
});

const displayRoadmap = () => {
    const roadmap = JSON.parse(localStorage.getItem("roadmap"));

    if (!roadmap) {
        roadmapCard.classList.add("d-none");
        emptyRoadmap.classList.remove("d-none");
        return;
    }

    roadmapCard.classList.remove("d-none");
    emptyRoadmap.classList.add("d-none");

    roadmapCard.innerHTML = `
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <div>
                    <h4 class="fw-bold mb-3">
                        ${roadmap.title}
                    </h4>
                    <div class="progress mb-4" style="height:10px;">
                        <div class="progress-bar" style="width:${roadmap.progress}%;">
                        </div>
                    </div>

                    <div class="mb-3">
                        <h6 class="fw-semibold">
                            Current Milestone
                        </h6>
                        <p class="text-secondary mb-0">
                            ${roadmap.current}
                        </p>
                    </div>

                    <div>
                        <h6 class="fw-semibold">
                            Next Milestone
                        </h6>
                        <p class="text-secondary mb-0">
                            ${roadmap.next}
                        </p>
                    </div>

                </div>

                <div class="d-flex gap-2">
                    <button class="btn btn-outline-primary btn-sm edit-roadmap">
                        <i data-lucide="pencil"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm delete-roadmap">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

displayRoadmap();

roadmapCard.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-roadmap");

    if (deleteBtn) {
        localStorage.removeItem("roadmap");
        roadmapCard.innerHTML = "";
        roadmapCard.classList.add("d-none");
        emptyRoadmap.classList.remove("d-none");
        displayRoadmap();
        return;
    }

    const editBtn = e.target.closest(".edit-roadmap");

    if (editBtn) {
        const roadmap = JSON.parse(localStorage.getItem("roadmap"));

        roadmapForm.roadmapTitle.value = roadmap.title;
        roadmapForm.roadmapProgress.value = roadmap.progress;
        roadmapForm.currentMilestone.value = roadmap.current;
        roadmapForm.nextMilestone.value = roadmap.next;

        roadmapModalTitle.textContent = "Edit Roadmap";
        bootstrap.Modal.getOrCreateInstance(roadmapModal).show();
    }
});

