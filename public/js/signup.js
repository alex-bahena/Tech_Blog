const signupTemplateHandler = async function (event) {
    event.preventDefault();

    const userName = document.querySelector('#username-input-signup');
    const email = document.querySelector('#email-input-signup');
    const password = document.querySelector('#password-input-signup');
    const response = await fetch('/api/user', {
        method: 'post',
        body: JSON.stringify({
            username: userName.value,
            email: email.value,
            password: password.value
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    console.log(response.body);
response.ok ? document.location.replace('/dashboard') : alert(response.statusText);
};

document.querySelector('#signup-form').addEventListener('submit', signupTemplateHandler);