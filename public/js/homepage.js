const handleLogoutButton = () => {
    console.log("handlelogout")
};

const handleLoginButton = () => {
    console.log("handleling")
};

if (document.getElementById("loginLink")) {
    document.getElementById("loginLink").addEventListener("click", handleLoginButton);
}
else {
    document.getElementById("logoutLink").addEventListener("click", handleLogoutButton);
}
