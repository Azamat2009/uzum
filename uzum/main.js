const slider = document.querySelector('.slider');
let card = document.querySelector("#cardImg")

card.onclick = () => {
    if (toCartId.includes(item.id)) {
        toCartId = toCartId.filter((el) => el !== item.id);
        localStorage.setItem("liked", JSON.stringify(toCartId));
    } else {
        toCartId.push(item.id);
        localStorage.setItem("liked", JSON.stringify(toCartId));
    }
};