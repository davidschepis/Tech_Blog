const handleSignup = () => {
    event.preventDefault();
    console.log(document.getElementById("signupUsername").value);
}

document.getElementById("signupForm").addEventListener("submit", handleSignup);