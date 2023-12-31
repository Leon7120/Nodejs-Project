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
            console.log(res.headers.get('Authorization'));
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
        document.getElementById("get-id").value = "";
        document.getElementById("get-category").value = "";
        document.getElementById("get-price").value = "";

        e.preventDefault();
    });
    function getFetchFunction(url) {
        fetch(url)
            .then(res => res.json())
            .then(result => {
                if (result.message) {
                    homeMessage.innerHTML = result.message;
                } else if (result.data) {
                    const table = document.getElementById("table");
                    table.innerHTML = "";

                    const headers = ["Id", "Category", "Price (RM)", "Edit", "Delete"];
                    const headerRow = document.createElement('tr');
                    headers.forEach(headerText => {
                        const th = document.createElement('th');
                        th.appendChild(document.createTextNode(headerText));
                        headerRow.appendChild(th);
                    });
                    table.appendChild(headerRow);

                    result.data.forEach(element => {
                        const row = document.createElement('tr');
                        const rowData = [element.P_Id, element.P_Category, element.P_Price];
                        rowData.forEach(data => {
                            const td = document.createElement('td');
                            td.appendChild(document.createTextNode(data));
                            row.appendChild(td);
                        });

                        ['Editable', 'Delete', 'Confirm', 'Add to Cart'].forEach(buttonText => {
                            const buttonCell = document.createElement('td');
                            const button = document.createElement('button');
                            button.innerText = buttonText;
                            if (buttonText == 'Delete') {
                                button.classList.add("delete-data-button");
                            } else if (buttonText == 'Editable') {
                                button.classList.add("edit-data-button");
                            } else if (buttonText == 'Confirm') {
                                button.classList.add("confirm-data-button");
                            } else if (buttonText == 'Add to Cart') {
                                button.classList.add("add-to-cart-button");
                            }
                            buttonCell.appendChild(button);
                            row.appendChild(buttonCell);
                        });

                        table.appendChild(row);
                    });
                    implementDeleteFunctionToButton();
                    implementEditFunctionToButton();
                    implementConfirmFunctionToButton();
                }
            })
            .catch(error => {
                console.log(`There was a problem with the fetch operation: ${error.message}`);
            });
    }
    function implementDeleteFunctionToButton() {
        var dataButtonFunction = document.querySelectorAll(".delete-data-button");
        dataButtonFunction.forEach(btn => {
            btn.onclick = function (e) {
                const idValue = e.target.closest('tr').querySelector('td:first-child').innerHTML;
                deleteFunction(idValue);
                var row = e.target.closest('tr');
                row.remove();
            }
        })
    }
    function implementEditFunctionToButton() {
        var dataButtonFunction = document.querySelectorAll(".edit-data-button");
        dataButtonFunction.forEach(btn => {
            btn.onclick = function (e) {
                const targetColumn2 = e.target.closest('tr').querySelector('td:nth-child(2)');
                const targetColumn3 = e.target.closest('tr').querySelector('td:nth-child(3)');

                if (btn.innerText == 'Editable') {
                    btn.defaultValue1 = targetColumn2.innerText;
                    btn.defaultValue2 = targetColumn3.innerText;
                    btn.innerText = "Cancel";
                    targetColumn2.setAttribute('contenteditable', true);
                    targetColumn3.setAttribute('contenteditable', true);
                } else if (btn.innerText == "Cancel") {
                    btn.innerText = "Editable"
                    targetColumn2.setAttribute('contenteditable', false);
                    targetColumn3.setAttribute('contenteditable', false);
                    targetColumn2.innerText = btn.defaultValue1;
                    targetColumn3.innerText = btn.defaultValue2;
                }
            }
        })
    }
    function implementConfirmFunctionToButton() {
        var dataButtonFunction = document.querySelectorAll(".confirm-data-button");
        dataButtonFunction.forEach(btn => {
            btn.onclick = function (e) {
                const targetColumn1 = e.target.closest('tr').querySelector('td:nth-child(1)');
                const targetColumn2 = e.target.closest('tr').querySelector('td:nth-child(2)');
                const targetColumn3 = e.target.closest('tr').querySelector('td:nth-child(3)');
                const targetColumn4 = e.target.closest('tr').querySelector('.edit-data-button');
                targetColumn4.innerText = "Editable"
                targetColumn2.setAttribute('contenteditable', false);
                targetColumn3.setAttribute('contenteditable', false);

                try {
                    updateFunction(targetColumn1.innerText, targetColumn2.innerText, targetColumn3.innerText);
                } catch (err) {
                    console.log(err);
                }
            }
        })
    }


    var data = document.getElementById('table-data');
    if (data) {
        getFetchFunction(url + "/pizza");
    }
    const deleteForm = document.getElementById("delete-form");
    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        homeMessage.innerHTML = "";
        var id = document.getElementById("delete-id").value;

        deleteFunction(id);
    });

    function deleteFunction(id) {
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
    }
    const updateForm = document.getElementById("update-form");

    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        homeMessage.innerHTML = "";
        var id = document.getElementById("update-id").value;
        var category = document.getElementById("update-category").value;
        var price = document.getElementById("update-price").value;

        updateFunction(id, category, price);
    });

    function updateFunction(id, category, price) {
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
    }
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
        createForm.reset();

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




