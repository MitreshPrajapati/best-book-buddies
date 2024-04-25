
const BASEURL = "https://best-book-buddies.onrender.com"


const handleFormSubmit = async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
        let payload = JSON.stringify({ email, password });
        console.log(payload);

        const response = await fetch(`${BASEURL}/users/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: payload
        });
console.log(response);
        const data = await response.json();
        if (response.ok) {
            alert("User registered successfully")
            window.location.href = 'login.html';
        } else {
            console.log(data)
            alert(data.message);
        }
    } catch (error) {
        console.log(error);
        alert('An error occurred, please try again later')
    }

}

const form = document.querySelector('#signupForm');
form.addEventListener('submit', handleFormSubmit);
