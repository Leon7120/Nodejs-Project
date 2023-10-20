


const loginForm = document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');
const signInButton = document.getElementById('sign-in-button');
const signUpButton = document.getElementById('sign-up-button');

signInButton.addEventListener('click', () => {
    loginForm.style.display = 'block';
    signUpForm.style.display = 'none';
});
signUpButton.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signUpForm.style.display = 'block';
});

const url = "http://localhost:3000/v1"
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var user = document.getElementById("sign-up-username").value;
    var pw = document.getElementById("sign-up-password").value;
    fetch(url + '/register', {
        method: 'POST',
        body: JSON.stringify({
            username: user,
            password: pw,
        }), headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(function (res) {
        return res.json();
    }).then(function (message) {
        console.log(message);
    }).catch(err => {
        alert(err);
    })
});

var pizzaUrl = 'http://localhost:3000/v1/pizza';
const get = document.getElementById("get");
get.addEventListener('click', (event) => {
    event.preventDefault;
    fetch(pizzaUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();  // This returns a promise
        })
        .then(data => {
            // Now we have the data
            console.log(data);
        })
        .catch(error => {
            console.log(`There was a problem with the fetch operation: ${error.message}`);
        });
})
