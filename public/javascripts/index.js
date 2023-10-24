const signInForm = document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');
const signInButton = document.getElementById('sign-in-button');
const signUpButton = document.getElementById('sign-up-button');
const url = "http://localhost:3000/v1"



signInButton.addEventListener('click', () => {
    signInForm.style.display = 'block';
    signUpForm.style.display = 'none';
});
signUpButton.addEventListener('click', () => {
    signInForm.style.display = 'none';
    signUpForm.style.display = 'block';
});

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var user = document.getElementById("sign-up-username").value;
    var pw = document.getElementById("sign-up-password").value;
    var message = document.getElementById("message");

    fetch(url + '/register', {
        method: 'POST',
        body: JSON.stringify({
            username: user,
            password: pw,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(function (res) {
        return res.json();
    }).then(function (msg) {
        message.innerHTML = msg.message;
        console.log(msg);
    }).catch(err => {
        alert(err);
    })

    signUpForm.reset();
});

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var user = document.getElementById("sign-in-username").value;
    var pw = document.getElementById("sign-in-password").value;
    var message = document.getElementById("message");

    fetch(url + '/login', {
        method: 'POST',
        redirect: "follow",
        body: JSON.stringify({
            username: user,
            password: pw,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((res) => {
        return (res.json());
    }).then(function (msg) {
        if (msg.status === 200) {
            window.location.href = msg.message;
        } else {
            message.innerHTML = msg.message;
            console.log(msg);
        }

    }).catch(err => {
        throw (err);
    })

    signInForm.reset();
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
