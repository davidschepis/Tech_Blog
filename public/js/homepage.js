//handles a new comment
const handleNewComment = async (el) => {
    event.preventDefault();
    //first check if user is logged in
    const res = await fetch("/api/users/logged_in");
    const response = await res.text();
    if (response !== "logged_in") {
        document.location.replace("/login");
    }
    const id = extractID(el.id);
    const text = document.getElementById("newCommentText" + id).value;
    const data = await fetch("/api/users/newComment", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, text }),
    });
    if (data.ok) {
        console.log("comment added");
        const comment = await data.json();
        let date = new Date(comment.date);
        let output = `<div class="card-header">${comment.creator}, ${date.toLocaleDateString()}</div>`;
        output += `<ul class="list-group list-group-flush">`;
        output += `<li class="list-group-item">`
        output += `${comment.content}`;
        output += `</li>`;
        output += `</ul></div>`;
        $(`#commentblogPost${comment.blog_post_id}`).append(output);
    }
    else {
        console.log("Unable to create new comment");
    }
};

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
    //////////show blog content
    const id = extractID(el.id);
    const blogContent = await fetch(`/blogContent/${id}`);
    if (!blogContent.ok) {
        alert("DB Error! Unable to retrieve blog post content");
        return;
    }
    const content = await blogContent.json();
    const p = $("<p>");
    p.addClass("card-text");
    p.text(`Content: ${content}`);
    p.attr("id", `ccontent${id}`);
    $(`#post${id}`).append(p);
    ///////////
    ////////////show comments
    const data = await fetch(`/api/users/comments/${id}`);
    if (!data.ok) {
        alert("DB Error! Unable to retrieve comments");
        return;
    }
    const comments = await data.json();
    //if no comments just output the add comment form
    if (!comments.length) {
        let output = `<div class="card m-5" id="newCommentBox${id}" style="width: 18rem;">`;
        output += ` <div class="card-header text-white bg-dark">Add new comment!</div>`;
        output += `<form id="commentForm${id}" onsubmit="handleNewComment(this)"><div class="form-group"><label for="newCommentForm${id}">Comment:</label>`;
        output += `<input type="text" class="form-control" id="newCommentText${id}" placeholder="Enter comment"></div>`;
        output += `<button type="submit" class="btn btn-dark">Submit</button>`;
        output += `</form></div>`;
        const blogPost = $(`#${el.id}`);
        blogPost.after(output);
        return;
    }
    /////////add comments under post
    const blogPost = $(`#${el.id}`);
    let output = ``
    output += `<div class="card text-white bg-dark" id="comment${el.id}" style="width: 18rem;">`;
    comments.forEach(e => {
        let date = new Date(e.date);
        output += ` <div class="card-header">${e.creator}, ${date.toLocaleDateString()}</div>`;
        output += `<ul class="list-group list-group-flush">`;
        output += `<li class="list-group-item">`
        output += `${e.content}`;
        output += `</li>`;
    });
    output += `</ul></div>`;
    /////////////add new comment box
    output += `<div class="card m-5" id="newCommentBox${id}" style="width: 18rem;">`;
    output += ` <div class="card-header text-white bg-dark">Add new comment!</div>`;
    output += `<form id="commentForm${id}" onsubmit="handleNewComment(this)"><div class="form-group"><label for="newCommentForm${id}">Comment:</label>`;
    output += `<input type="text" class="form-control" id="newCommentText${id}" placeholder="Enter comment"></div>`;
    output += `<button type="submit" class="btn btn-dark">Submit</button>`;
    output += `</form></div>`;

    blogPost.after(output);
}

//helper function to extract the numeric portion of a blogpost's #id
const extractID = (el) => {
    return parseInt(String(el).match(/\d+/gi).join(''))
};
