import axios from "axios";
const slider = document.querySelector('.slider');

let locData = JSON.parse(localStorage.getItem("users"))

if (!locData) {
    location.assign("/pages/registration.html")
}