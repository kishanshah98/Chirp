const signOut = async () => {
  const response = await fetch("/api/user/signout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#sign-out").addEventListener("click", signOut);
