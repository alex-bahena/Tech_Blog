const postId = document.getElementById('post-id')
if (postId) {
    const deleteTemplateHandler = async function (event) {
        event.preventDefault();

        const response = await fetch('/api/post/' + postId.value, {
            method: 'DELETE'
        });
        response.ok ? document.location.replace('/dashboard/') : alert(response.statusText);
    }
    document.querySelector('#delete-btn').addEventListener('click', deleteTemplateHandler);
}