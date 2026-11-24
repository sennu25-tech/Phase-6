const feedbackList = document.getElementById("feedbackList");

// READ - Display all feedback
async function getFeedback() {
    try {
        const response = await fetch("http://localhost:5000/feedback");

        if (!response.ok) throw new Error("Unable to fetch feedback");

        const feedback = await response.json();

        feedbackList.innerHTML = "";

        feedback.forEach(item => {
            const card = document.createElement("div");
            card.className = "feedback-card";

            card.innerHTML = `
                <h3>${item.name}</h3>
                <p>Rating: ${item.rating}/5</p>
                <p>${item.comment}</p>
            `;

            const updateBtn = document.createElement("button");
            updateBtn.textContent = "Update";
            updateBtn.onclick = () => updateFeedback(item,card);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => deleteFeedback(item._id);

            card.append(updateBtn, deleteBtn);
            feedbackList.appendChild(card);
        });

    } catch (error) {
        feedbackList.innerHTML = "Unable to load feedback.";
        console.log(error);
    }
}

// DELETE
async function deleteFeedback(id) {
    if (!confirm("Are you sure you want to delete?")) return;

    try {
        const response = await fetch(`http://localhost:5000/feedback/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Delete failed");

        alert("Feedback deleted!");
        getFeedback();

    } catch (error) {
        alert("Unable to delete feedback.");
        console.log(error);
    }
}


// UPDATE
async function updateFeedback(item, card) {
    card.innerHTML = `
        <form id="updateForm">
            <input id="editName" value="${item.name}" required>
            <input id="editRating" type="number" value="${item.rating}" min="1" max="5" required>
            <textarea id="editComment" required>${item.comment}</textarea>
            <button type="submit">Save Changes</button>
            <button type="button" id="cancelBtn">Cancel</button>
        </form>
    `;

    const form = card.querySelector("#updateForm");

    form.onsubmit = async (e) => {
        e.preventDefault();

        const name = card.querySelector("#editName").value.trim();
        const rating = Number(card.querySelector("#editRating").value);
        const comment = card.querySelector("#editComment").value.trim();

        if (!name || !comment || !Number.isInteger(rating) || rating < 1 || rating > 5) {
            alert("Please enter valid details.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/feedback/${item._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, rating, comment })
            });

            if (!response.ok) throw new Error("Update failed");

            alert("Feedback updated!");
            getFeedback();

        } catch (error) {
            alert("Unable to update feedback.");
            console.log(error);
        }
    };

    card.querySelector("#cancelBtn").onclick = getFeedback;
}

getFeedback();

