const signInFormHandler = async (event) => {
  console.log('signInFormHandler');

    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
console.log(`email: ${email}, password: ${password}`);

    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      // console.log(body);
  console.log(response);

      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  document.getElementById("submitBtn").addEventListener("click", signInFormHandler);

