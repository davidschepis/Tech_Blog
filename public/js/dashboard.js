const newBlogPost = () => {
    document.location.replace('/dashboard/new');
};

const handleBlogClick = (id, title, content) => {
    $('#title').val(title);
    $('#content').val(content);
    $('#postID').text("Post Number: " + id);
    $('#updateModal').modal('show');
};

const closeModal = () => {
    $('#updateModal').modal('hide');
}

const deletePost = async () => {
    let id = $('#postID').text();
    id = extractID(id);
    const response = await fetch(`/api/users/deletePost/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }
};

const updatePost = async () => {
    const title = $('#title').val();
    const content = $('#content').val();
    let id = $('#postID').text();
    id = extractID(id);
    const data = await fetch(`/api/users/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
    });
    if (data.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update post');
    }
};

