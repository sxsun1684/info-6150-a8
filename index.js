const listCollection = document.getElementById("tv-shows-list");

async function loadShows() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error("Failed to load shows");
        }
        const shows = await res.json();

        listCollection.innerHTML = "";

        shows.forEach(show => {
            const article = document.createElement("article");
            article.className = "show-item";

            article.innerHTML = `
                <h3>${show.title}</h3>
                <a href="detail.html?id=${show.id}">More Detail...</a>
                <p><strong>Year:</strong> ${show.year}</p>
                <p><strong>Rating:</strong> ${show.rating}</p>
                <p><strong>Seasons:</strong> ${show.seasons}</p>
                <p><strong>Creator:</strong> ${show.creator}</p>
                <p><strong>Director:</strong> ${show.director}</p>
                <p><strong>Actor:</strong> ${Array.isArray(show.actor) ? show.actor.join(", ") : show.actor}</p>
                <p><strong>Type:</strong> ${Array.isArray(show.genre) ? show.genre.join(", ") : show.genre}</p>
                <button class="delete-btn">Delete</button>
                <button class="update-btn">Update</button>
            `;

            // delete
            const deleteBtn = article.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", async () => {
                const ok = confirm("Are you sure to delete this item?");
                if (!ok) return;

                try {
                    await fetch(`${API_URL}/${show.id}`, {
                        method: "DELETE"
                    });
                    loadShows();
                } catch (e) {
                    alert("Delete failed.");
                }
            });

            listCollection.appendChild(article);
        });

    } catch (err) {
        listCollection.innerHTML =
            `<p class="error">Error loading shows: ${err.message}</p>`;
    }

}

loadShows();

