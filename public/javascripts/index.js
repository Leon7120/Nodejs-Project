const signInForm = document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');
const signInButton = document.getElementById('sign-in-button');
const signUpButton = document.getElementById('sign-up-button');
const url = "http://localhost:3000/v1"

if (signInButton) {
    var message = document.getElementById("message");

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
        var formData = new FormData(e.target);

        var user = formData.get("username");
        var pw = formData.get("password");
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
            console.log(err);
            message.innerHTML = err.message;
        })
        signUpForm.reset();
    });
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Create a FormData instance
        var formData = new FormData(e.target);

        // Get form data
        var user = formData.get("username");
        var pw = formData.get("password");
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


    // const loginUser = document.getElementById("sign-in-username");
    // const loginPw = document.getElementById("sign-in-password");

    // loginUser.addEventListener('input', (e) => {
    //     if (loginUser.value == "" || !loginUser.value || loginUser.value == null) {
    //         message.innerHTML = "Empty Username";
    //     } else {
    //         message.innerHTML = "";
    //     }
    // })
    // loginPw.addEventListener("input", (e) => {
    //     if (loginPw.value == null || !loginPw.value || loginPw.value == "") {
    //         message.innerHTML = "Empty Password";
    //     } else {
    //         message.innerHTML = "";
    //     }
    // })
    const fields = {
        "signin-username": "Empty Username",
        "signin-password": "Empty Password",
        "signup-username": "Empty Username",
        "signup-password": "Empty Password"
    };

    for (let id in fields) {
        document.getElementById(id).addEventListener('input', (e) => {
            let message = document.getElementById(id + "-message");
            message.innerHTML = e.target.value.trim() === "" ? fields[id] : "";
        });
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

    const actions = document.getElementById('actions-form');
    const homeMessage = document.getElementById("home-message");
    const getButton = document.getElementById("get-button");

    getButton.addEventListener('click', (e) => {
        homeMessage.innerHTML = "";

        var id = document.getElementById("get-id").value;
        var category = document.getElementById("get-category").value;
        var price = document.getElementById("get-price").value;

        if (id == "" && category == "" && price == "") {
            getFetchFunction(url + "/pizza")
        } else {
            const params = new URLSearchParams({
                id: id,
                category: category,
                price: price
            })
            getFetchFunction(url + `/pizza?${params}`)
        }
        e.preventDefault();
    });
    function getFetchFunction(url) {
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.message) {
                    console.log(data.message);
                    homeMessage.innerHTML = data.message;
                } else if (data.data) {
                    const table = document.getElementById("table");
                    table.innerHTML = "";

                    const tr2 = document.createElement('tr');
                    const th1 = document.createElement('th');
                    const th2 = document.createElement('th');
                    const th3 = document.createElement('th');

                    const headerId = document.createTextNode("Id");
                    const headerCategory = document.createTextNode("Category");
                    const headerPrice = document.createTextNode("Price");

                    th1.appendChild(headerId);
                    th2.appendChild(headerCategory);
                    th3.appendChild(headerPrice);
                    tr2.appendChild(th1);
                    tr2.appendChild(th2);
                    tr2.appendChild(th3);
                    table.appendChild(tr2);

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
    }
    const deleteForm = document.getElementById("delete-form");

    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        homeMessage.innerHTML = "";
        var id = document.getElementById("delete-id").value;

        fetch(url + `/pizza/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((res) => {
            return (res.json());
        }).then(function (msg) {
            if (msg.status === 200) {
                homeMessage.innerHTML = msg.message;
            } else {
                homeMessage.innerHTML = msg.message;
                console.log(msg);
            }
        }).catch(err => {
            console.log(err);
            homeMessage.innerHTML = err.message;
        })
    });

    const updateForm = document.getElementById("update-form");

    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        homeMessage.innerHTML = "";
        var id = document.getElementById("update-id").value;
        var category = document.getElementById("update-category").value;
        var price = document.getElementById("update-price").value;

        fetch(url + `/pizza/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                category: category,
                price: price,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((res) => {
            return (res.json());
        }).then(function (msg) {
            if (msg.status === 200) {
                homeMessage.innerHTML = msg.message;
            } else {
                homeMessage.innerHTML = msg.message;
                console.log(msg);
            }
        }).catch(err => {
            console.log(err);
            homeMessage.innerHTML = err.message;
        })
    });

    const createForm = document.getElementById("create-form");

    createForm.addEventListener('submit', (e) => {
        e.preventDefault();

        homeMessage.innerHTML = "";
        var id = document.getElementById("create-id").value;
        var category = document.getElementById("create-category").value;
        var price = document.getElementById("create-price").value;

        fetch(url + "/pizza", {
            method: "POST",
            body: JSON.stringify({
                id: id,
                category: category,
                price: price,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((res) => {
            return (res.json());
        }).then(function (msg) {
            if (msg.status === 200) {
                homeMessage.innerHTML = msg.message;
            } else {
                homeMessage.innerHTML = msg.message;
                console.log(msg);
            }
        }).catch(err => {
            console.log(err);
            homeMessage.innerHTML = err.message;
        })
    });

    const spanButton = document.querySelectorAll('.span-button');
    spanButton.forEach(btn => {
        btn.onclick = function (e) {
            const spanAction = e.target.closest('li').querySelector('.span_item').innerHTML;
            document.querySelectorAll(".actions-form").forEach(element => element.style.display = "none");
            homeMessage.innerHTML = "";

            if (spanAction == "Get") {
                document.getElementById("search-pizza-div").style.display = "block"
            } else if (spanAction == "Create") {
                document.getElementById("create-pizza-div").style.display = "block"
            } else if (spanAction == "Update") {
                document.getElementById("update-pizza-div").style.display = "block"
            } else if (spanAction == "Delete") {
                document.getElementById("delete-pizza-div").style.display = "block"
            }
        }
    });
}
