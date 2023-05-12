import axios from "axios";

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () =>
  container.classList.add('right-panel-active')
);

signInButton.addEventListener('click', () =>
  container.classList.remove('right-panel-active')
);

let regis = document.forms.reg


regis.addEventListener("submit", (e) => {
    e.preventDefault();

    let user = {
        name: document.getElementById("nameInput").value,
        email: document.getElementById("emailInput").value,
        password: document.getElementById("passwordInput").value
    };


    let fm = new FormData(e.target);

    fm.forEach((value, key) => {
        user[key] = value;
    });

    if (user.email && user.name && user.password) {
        axios.post('http://localhost:3000/users').then(res => console.log(res))
    } else {
        alert("something went wrong,try again")
    }


});


let form = document.forms.login
let login = document.querySelectorAll(".login")
let loc = JSON.parse(localStorage.getItem("users"))

form.onsubmit = (e) => {
    e.preventDefault()
    login[0].value = loc.email

if (login[1].value === loc.password) {
window.location.assign('/index.html')
}
}