const form = document.getElementById("createForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get the values of each field through form.elements
    const title = form.elements["title"].value.trim();
    const creator = form.elements["creator"].value.trim();
    const year = Number(form.elements["year"].value);
    const rating = Number(form.elements["rating"].value);
    const director = form.elements["director"].value.trim();
    const seasons = Number(form.elements["seasons"].value);
    const actorRaw = form.elements["actor"].value.trim();
    const description = form.elements["description"].value.trim();
    const avatar = form.elements["avatar"].value.trim();
    const genre = form.elements["genre"].value.trim();
    // const currentYear = new Date().getFullYear();

    if (!title || !creator || !year || !rating || !director || !seasons || !actorRaw) {
        alert("Please fill in all fields.");
        return;
    }
    const currentYear = new Date().getFullYear();
    if (year > currentYear) {
        alert(`Year cannot be greater than ${currentYear}.`);
        return;
    }
    const actor = actorRaw
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);

    const newShow = {
        title,
        creator,
        year,
        rating,
        director,
        seasons,
        actor,
        genre,
        description,
        avatar
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newShow)
        });

        alert("Created!");
        window.location.href = "index.html";
    } catch (err) {
        alert("Create failed");
    }
});
