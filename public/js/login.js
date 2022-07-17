const loginTemplateHandler = async function (event) {
    event.preventDefault();

    const username = document.querySelector('#username-input-login');
    const password = document.querySelector('#password-input-login');
    const response = await fetch('/api/user/login', {
        method: 'post',
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    response.ok ? document.location.replace('/dashboard') : alert(response.statusText);
};

document.querySelector('#login-form').addEventListener('submit', loginTemplateHandler);