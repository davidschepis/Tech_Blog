const handleLogin = () => {
    event.preventDefault();
    console.log(document.getElementById("loginUsername").value);
}

document.getElementById("loginForm").addEventListener("submit", handleLogin);