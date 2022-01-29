//logs user in
const handleLogin = async () => {
    event.preventDefault();
    const username = document.querySelector('#loginUsername').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert("Unable to login");
        }
    }
}

document.getElementById("loginForm").addEventListener("submit", handleLogin);