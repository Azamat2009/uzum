let user = JSON.parse(localStorage.getItem('user'));
let baseURL = "http://localhost:3000/goods";
let locData = JSON.parse(localStorage.getItem("users"))

export function header() {
  let body = document.body;
  let header = document.createElement("div");
  let elasticItems = [];
  let left_side = document.createElement("div");
  let logo = document.createElement('img')
  let logoHref = document.createElement('a')
  let katalog = document.createElement('button')

  let middle = document.createElement('div')
  let form = document.createElement("form")
  form.innerHTML = `
    <input type="text" placeholder="Искать товары" class="elastic">
    <button class="def-btn">
      <img src="/public/icons/lupa.svg" alt="">
    </button>
    <div class="spisok">
    </div>
  `;

  let right_side = document.createElement("div");
  let userDiv = document.createElement('div')
  let userLogo = document.createElement('img')
  let userBtn = document.createElement('button')
  let userHref = document.createElement("a")

  let favouriteBtn = document.createElement('button')
  let favouriteHref = document.createElement("a")

  let cardBtn = document.createElement('button')
  let cardHref = document.createElement("a")


  middle.classList.add("middle")
  header.classList.add("header");
  left_side.classList.add("left_side");
  right_side.classList.add("right_side");
  userDiv.classList.add("userDiv");

  userHref.href = ""
  favouriteHref.href = "/pages/favorite.html"
  logoHref.href = "/index.html"

  favouriteBtn.innerHTML = 'Избранное'
  favouriteBtn.href = "/pages/tovar.html"
  cardBtn.innerHTML = 'Корзина'
  cardHref.href = "/pages/card.html"
  katalog.innerHTML = "Каталог"
  logo.src = "/public/img/logo.png";
  userLogo.src = "/public/icons/user.svg";


  if (!locData || !locData.name) {
    userBtn.innerHTML = 'Шахзод';
  } else {
    userBtn.innerHTML = locData.name;
  }
  


  cardHref.append(cardBtn)
  userHref.append(userDiv)
  favouriteHref.append(favouriteBtn)
  logoHref.append(logo)
  body.prepend(header);
  header.append(left_side, middle, right_side);
  left_side.append(logoHref, katalog);
  userDiv.append(userLogo, userBtn)
  right_side.append(userHref, favouriteHref, cardHref);
  middle.append(form)

  let list = document.querySelector('.spisok');
  let inputSearch = document.querySelector(".elastic");

  function updateList(searchText) {
    list.innerHTML = "";
  
    const similarGoods = elasticItems.filter((good) => good.title.toLowerCase().includes(searchText.toLowerCase())).slice(0, 3);
    similarGoods.forEach((good) => {
      const listItem = document.createElement("div");
      listItem.classList.add("item");
      const title = good.title;
      const markedText = title.replace(new RegExp(searchText, "gi"), '<mark class="marked-text">$&</mark>');
      listItem.innerHTML = markedText;
      listItem.setAttribute("data-id", good.id);
      list.appendChild(listItem);
    });
  }
  

inputSearch.addEventListener("input", (event) => {
  const searchText = event.target.value;
  updateList(searchText);
});

list.addEventListener("click", (event) => {
  const listItem = event.target;
  if (listItem.tagName === "DIV" && listItem.classList.contains("item")) {
    const goodId = listItem.getAttribute("data-id");
    window.location.href = `/pages/tovar.html?id=${goodId}`;
  }
});


fetch(baseURL)
  .then(res => res.json())
  .then(data => {
    elasticItems = data;
  })
  .catch(error => console.error(error));
}

header();