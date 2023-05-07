let user = JSON.parse(localStorage.getItem('user'))


export function header(params) {
  let body = document.body;
  let header = document.createElement("div");

  let left_side = document.createElement("div");
  let logo = document.createElement('img')
  let logoHref = document.createElement('a')
  let katalog = document.createElement('button')

  let middle = document.createElement('div')
  let searchInp = document.createElement('input')
  let lupa = document.createElement('img')

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

  userHref.href = "/pages/tovar.html"
  favouriteHref.href = "/pages/favorite.html"
  logoHref.href = "/index.html"
  searchInp.type = "search"
  searchInp.placeholder = "Искать товары"
  userBtn.innerHTML = 'Шахзод'
  favouriteBtn.innerHTML = 'Избранное'
  favouriteBtn.href = "/pages/tovar.html"
  cardBtn.innerHTML = 'Корзина'
  katalog.innerHTML = "Каталог"
  lupa.src = "/public/icons/lupa.svg";
  logo.src = "/public/img/logo.png";
  userLogo.src = "/public/icons/user.svg";


  userHref.append(userDiv)
  favouriteHref.append(favouriteBtn)
  logoHref.append(logo)
  body.prepend(header);
  header.append(left_side,middle ,right_side);
  left_side.append(logoHref,katalog);
  userDiv.append(userLogo,userBtn)
  right_side.append(userHref,favouriteHref,cardBtn);
  middle.append(searchInp,lupa)

}

header()