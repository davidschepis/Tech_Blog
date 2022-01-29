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

const updatePost = () => {
    const title = $('#title').val();
    const content = $('#content').val();
    console.log(title + content);
};

