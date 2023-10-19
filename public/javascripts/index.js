


const loginForm = document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');
const signInButton = document.getElementById('sign-in-button');
const signUpButton = document.getElementById('sign-up-button');

signInButton.addEventListener('click', () => {
    loginForm.style.display = 'block';
    signUpForm.style.display = 'none';
    console.log("Hello");
});
signUpButton.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signUpForm.style.display = 'block';
});

const url = "http://localhost:3000/v1"
const form = document.getElementById('sign-up-form');
form.addEventListener('submit', async (event) =>{
    event.preventDefault;
    
} )
// form.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const data = new FormData(form);
//   console.log(Array.from(data));
//   try {
//     const res = await fetch(
//         url + '/login',
//       {
//         method: 'POST',
//         body: data,
//       },
//     );
//     const resData = await res.json();
//     console.log(resData);
//   } catch (err) {
//     console.log(err.message);
//   }
// });
