const commentTemplate = async function (event) {
    event.preventDefault();

    const post_id = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;

    if (body) {
        const response =await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response.ok ? document.location.reload() : alert(response.statusText);
    }
};

document.querySelector('#new-comment-form').addEventListener('submit', commentTemplate);