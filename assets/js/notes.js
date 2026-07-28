const noteForm = document.getElementById("note-form");
const noteContainer = document.getElementById("notes-list");
const noteModal = document.getElementById("noteModal");
const noteFormHeading = document.getElementById("note-modal-title");

let noteEditIndex = null;

// Save Note
noteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const noteTitle = e.target.noteTitle.value;
    const noteContent = e.target.noteContent.value;

    let notes = JSON.parse(localStorage.getItem("newNote")) ?? [];

    if (noteEditIndex === null) {
        notes.push({
            noteTitle,
            noteContent
        });
    } else {
        notes[noteEditIndex] = {
            noteTitle,
            noteContent
        };

        noteEditIndex = null;
    }

    localStorage.setItem("newNote", JSON.stringify(notes));
    noteForm.reset();
    noteFormHeading.textContent = "Add Note";
    displayNotes();
    const modal = bootstrap.Modal.getOrCreateInstance(noteModal);
    modal.hide();
});

// Display Notes
const displayNotes = () => {
    const notes = JSON.parse(localStorage.getItem("newNote")) ?? [];

    if (notes.length === 0) {
        noteContainer.innerHTML = `
            <div class="text-center py-5">
                <i data-lucide="notebook-pen" class="mb-3"></i>
                <h5>No Notes Yet</h5>
                <p class="text-secondary mb-0">
                    Click "Add Note" to create your first note.
                </p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    let notesHTML = "";

    notes.forEach((note, index) => {
        notesHTML += `
            <div class="card border-0 shadow-sm rounded-4 mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="flex-grow-1">
                            <h5 class="fw-semibold mb-2">
                                ${note.noteTitle}
                            </h5>
                            <p class="text-secondary mb-0">
                                ${note.noteContent}
                            </p>
                        </div>
                        <div class="d-flex gap-2">
                            <button
                                class="btn btn-outline-primary btn-sm edit-note"
                                data-index="${index}">
                                <i data-lucide="pencil"></i>
                            </button>
                            <button
                                class="btn btn-outline-danger btn-sm delete-note"
                                data-index="${index}">
                                <i data-lucide="trash-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    noteContainer.innerHTML = notesHTML;
    lucide.createIcons();
};

displayNotes();

// Edit & Delete
noteContainer.addEventListener("click", (e) => {

    // Delete Note
    const deleteBtn = e.target.closest(".delete-note");
    if (deleteBtn) {
        let notes = JSON.parse(localStorage.getItem("newNote")) ?? [];
        const index = Number(deleteBtn.dataset.index);
        notes.splice(index, 1);
        noteEditIndex = null;
        localStorage.setItem("newNote", JSON.stringify(notes));
        displayNotes();
    }

    // Edit Note
    const editBtn = e.target.closest(".edit-note");
    if (editBtn) {
        const index = Number(editBtn.dataset.index);
        let notes = JSON.parse(localStorage.getItem("newNote")) ?? [];
        const selectedNote = notes[index];

        noteForm.noteTitle.value = selectedNote.noteTitle;
        noteForm.noteContent.value = selectedNote.noteContent;

        noteFormHeading.textContent = "Edit Note";
        noteEditIndex = index;
        const modal = bootstrap.Modal.getOrCreateInstance(noteModal);
        modal.show();
    }
});