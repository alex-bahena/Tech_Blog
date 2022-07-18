async function logout() {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    response.ok ? document.location.replace('/') : alert(response.statusText);
}

document.querySelector('#logout-link').addEventListener('click', logout);