const handleSignup = async () => {
    event.preventDefault();
    const username = document.querySelector('#signupUsername').value.trim();
    const password = document.querySelector('#signupPassword').value.trim();
    if (username && password) {
        const data = await fetch("/api/users/", {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-type': 'application/json' }
        });
        if (data.ok) {
            document.location.replace('/');
        }
        else {
            alert(data.statusText);
        }
    }
}

document.getElementById("signupForm").addEventListener("submit", handleSignup);