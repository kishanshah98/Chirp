const newChirp = async (event) => {
    event.preventDefault();
    console.log("submit btn clicked!")
    const chirpBody = document.getElementById("chirp-body").value.trim();
    console.log(chirpBody);
    if(chirpBody) {
        const response = await fetch("/api/chirps", {
            method: "POST",
            body: JSON.stringify({chirpBody}),
            headers: {
                "content-type": "application/json",
            },
        });

        if(response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Can't create chirp!");
        }
    }
};

const deleteChirp = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const chirpId = event.target.getAttribute("data-id");

        const response = await fetch(`/api/posts/${id}`, {
            method: "DELETE",
        });

        if(response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Can't delete chirp!");
        }
    }
};

document.getElementById("submitBtn").addEventListener("click", newChirp);
document.getElementById("deleteBtn").addEventListener("click", deleteChirp);


