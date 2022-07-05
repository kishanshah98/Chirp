const submitComment = async (event) => {
    event.preventDefault();

    const chirpId = document.querySelector(".new-chirp-comment").dataset.chirpid;
    const commentBody = document.querySelector("#comment").value.trim();

    if (commentBody) {
        const data = {
            chirpId, 
            comments: commentBody
        }
        console.log(data);
        await fetch ("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                chirpId, 
                comments: commentBody,
            }),
            headers: {
                "content-type": "application/json"
            }
        });
        document.location.reload();
    }
};

document.getElementById("submitBtn").addEventListener("click", submitComment);