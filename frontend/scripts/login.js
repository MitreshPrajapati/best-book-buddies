

async function handleFormSubmit(e)  {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
        let payload = JSON.stringify({ email, password });

        const response = await fetch('http://localhost:8090/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: payload
        });

        const data = await response.json();
       
        if (response.ok) {
            alert('login successful')
            console.log(data);
            const token = data.token;
           localStorage.setItem('taskmanagerToken', token);
           localStorage.setItem('taskmanagerUser', JSON.stringify(data.user));
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.log(error);
        alert('An error occurred, please try again later')
    }

}

const form = document.querySelector('#loginForm');
form.addEventListener('submit', handleFormSubmit);
