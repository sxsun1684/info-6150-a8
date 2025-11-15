const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("detailContainer");

if (!id) {
    container.innerHTML = "<p>No show ID found.</p>";
} else {
    loadDetail(id);
}

async function loadDetail(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) {
            throw new Error("Failed to fetch show detail");
        }

        const show = await res.json();
        renderDetail(show);
    } catch (error) {
        container.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

function renderDetail(show) {
    const actors = Array.isArray(show.actor) ? show.actor.join(", ") : show.actor;
    const genres = Array.isArray(show.genre) ? show.genre.join(", ") : show.genre;

    container.innerHTML = `
    <h2>${show.title}</h2>

    <ul>
    <li><strong>Creator:</strong> ${show.creator}</li>
    <li><strong>Year:</strong> ${show.year}</li>
    <li><strong>Rating:</strong> ${show.rating}</li>
    <li><strong>Director:</strong> ${show.director}</li>
    <li><strong>Seasons:</strong> ${show.seasons || "N/A"}</li>
    <li><strong>Main Actors:</strong> ${actors}</li>
    <li><strong>Genres:</strong> ${genres}</li>
    </ul>
    ${
        show.description
            ? `<p><strong>Description:</strong> ${show.description}</p>`
            : ""
    }
    ${
        show.avatar
            ? `<img src="${show.avatar}" alt="${show.title}" class="poster">`
            : ""
    }`;
}
