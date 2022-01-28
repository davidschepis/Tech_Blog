//handles when the logout button is clicked, kills the session and goes to the homepage
const handleLogoutButton = async () => {
    const data = await fetch("/api/users/logout", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    if (data.ok) {
        document.location.replace('/');
    }
    else {
        alert(data.statusText);
    }
};

//handles when the login button is clicked, sends the user to the login page
const handleLoginButton = async () => {
    document.location.replace("/login");
};

//Event listeners only for link currently on page
if (document.getElementById("loginLink")) {
    document.getElementById("loginLink").addEventListener("click", handleLoginButton);
}
else {
    document.getElementById("logoutLink").addEventListener("click", handleLogoutButton);
}

//makes the comments show when a card is clicked
const handleCardClick = async (el) => {
    const id = extractID(el.id);
    const data = await fetch(`/api/users/comments/${id}`);
    if (!data.ok) {
        alert("DB Error! Unable to retrieve comments");
        return;
    }
    const comments = await data.json();
    if (!comments.length) {
        return;
    }
    //add comments under post
    const blogPost = $(`#${el.id}`);
    let output = `<div class="card" id="comment${el.id}" style="width: 18rem;">`;
    comments.forEach(e => {
        let date = new Date(e.date);
        output += ` <div class="card-header">${e.creator}, ${date.toLocaleDateString()}</div>`;
        output += `<ul class="list-group list-group-flush">`;
        output += `<li class="list-group-item">`
        output += `${e.content}`;
        output += `</li>`;
    });
    output += `</ul></div>`;
    /////////////
    
    blogPost.after(output);
}

//helper function to extract the numeric portion of a blogpost's #id
const extractID = (el) => {
    return parseInt(String(el).match(/\d+/gi).join(''))
};
