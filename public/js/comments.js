const submitComment = async (event) => {
    event.preventDefault();

    const chirpId = document.querySelector(".new-chirp-comment").dataset.chirpId;
    const commentBody = document.querySelector("#comment").value.trim();

    if (commentBody) {
        await fetch ("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                chirpId, commentBody,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        document.location.reload();
    }
};

document.getElementById("submitBtn").addEventListener("click", submitComment);