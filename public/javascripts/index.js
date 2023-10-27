const signInForm = document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');
const signInButton = document.getElementById('sign-in-button');
const signUpButton = document.getElementById('sign-up-button');
const url = "http://localhost:3000/v1"

if (signInButton) {

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
            console.log(err);
            message.innerHTML = err.message;
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
                console.log(data);
            })
            .catch(error => {
                console.log(`There was a problem with the fetch operation: ${error.message}`);
            });
    })
    const loginUser = document.getElementById("sign-in-username");
    const loginPw = document.getElementById("sign-in-password");

    loginUser.addEventListener('input', (e) => {
        if (loginUser.value == "" || !loginUser.value || loginUser.value == null) {
            message.innerHTML = "Empty Username";
        } else {
            message.innerHTML = "";
        }
    })

    loginPw.addEventListener("input", (e) => {
        if (loginPw.value == null || !loginPw.value || loginPw.value == "") {
            message.innerHTML = "Empty Password";
        } else {
            message.innerHTML = "";
        }
    })
}

const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        fetch(url + "/logout", {
            method: "POST",
        })
        window.location.href = "/v1";
    })
}

const getForm = document.getElementById('get-form');
const createForm = document.getElementById('create-form');
const updateForm = document.getElementById('update-form');
const deleteForm = document.getElementById('delete-form');

getButton = document.getElementById("get-button");
getButton.addEventListener('click', (e) => {
    var id = document.getElementById("get-id").value;
    var category = document.getElementById("get-category").value;
    var price = document.getElementById("get-price").value;
    var msg = document.getElementById("message");

    const params = new URLSearchParams({
        id: id,
        category: category,
        price: price
    })

    e.preventDefault();
    fetch(`http://localhost:3000/v1/pizza?${params}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.message) {
                msg.innerHTML = data.message;
            } else if (data.data) {
                const table = document.getElementById("table");
                data.data.forEach(element => {
                    const tr = document.createElement('tr');
                    const td1 = document.createElement('td');
                    const td2 = document.createElement('td');
                    const td3 = document.createElement('td');
                    const dataId = document.createTextNode(element.P_Id);
                    const dataCategory = document.createTextNode(element.P_Category);
                    const dataPrice = document.createTextNode(element.P_Price);

                    td1.appendChild(dataId);
                    td2.appendChild(dataCategory);
                    td3.appendChild(dataPrice);

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);

                    table.appendChild(tr);

                    console.log(element);
                    // console.log(data.data[0].P_Category);
                });
            }
        }).catch(error => {
            console.log(`There was a problem with the fetch operation: ${error.message}`);
        });
});



