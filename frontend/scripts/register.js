
const BASEURL = "https://best-book-buddies.onrender.com"


const handleFormSubmit = async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
        let payload = JSON.stringify({ email, password });

        const response = await fetch(`${BASEURL}/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: payload
        });

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
