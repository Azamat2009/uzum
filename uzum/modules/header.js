let user = JSON.parse(localStorage.getItem('user'));
let baseURL = "http://localhost:3000/goods";

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

  userHref.href = "/pages/tovar.html"
  favouriteHref.href = "/pages/favorite.html"
  logoHref.href = "/index.html"
  userBtn.innerHTML = 'Шахзод'
  favouriteBtn.innerHTML = 'Избранное'
  favouriteBtn.href = "/pages/tovar.html"
  cardBtn.innerHTML = 'Корзина'
  katalog.innerHTML = "Каталог"
  logo.src = "/public/img/logo.png";
  userLogo.src = "/public/icons/user.svg";

  userHref.append(userDiv)
  favouriteHref.append(favouriteBtn)
  logoHref.append(logo)
  body.prepend(header);
  header.append(left_side, middle, right_side);
  left_side.append(logoHref, katalog);
  userDiv.append(userLogo, userBtn)
  right_side.append(userHref, favouriteHref, cardBtn);
  middle.append(form)

  let list = document.querySelector('.spisok');
  let inputSearch = document.querySelector(".elastic");

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    const inputValue = inputSearch.value.trim().toLowerCase();
    searchReload(inputValue);
  });


  const searchProducts = async (query) => {
    try {
      const response = await fetch(`${baseURL}?q=${query}`);
      const data = await response.json();
      return data.results || []; // Return an empty array if `data.results` is falsy
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  };

  const displaySearchResults = (results) => {
    list.innerHTML = "";
    
    if (results.length > 0) {
      for (let item of results) {
        let title = item.title;
        let highlightedTitle = getHighlightedTitle(title);

        list.innerHTML += `
          <a href="./productid.html?id=${item.id}">
            <div class="item">
              <span>${highlightedTitle}</span>
              <abbr title="hello brat"></abbr>
            </div>
          </a>
        `;
      }
    } else {
      list.style.display = "none";
    }
  };

  const getHighlightedTitle = (title) => {
    const inputValue = inputSearch.value.trim().toLowerCase();
    const regex = new RegExp(inputValue, "gi");
    return title.replace(regex, (match) => `<b>${match}</b>`);
  };

  const searchReload = async (val) => {
    list.innerHTML = "";

    if (val.length > 0) {
      try {
        const results = await searchProducts(val);
        displaySearchResults(results);
      } catch (error) {
        console.error('Error searching products:', error);
      }
    } else {
      list.style.display = "none";
    }
  };

  inputSearch.oninput = () => {
    let val = inputSearch.value.toLowerCase().trim();
    list.style.display = val.length > 0 ? "flex" : "none";
    searchReload(val);
  };

  // Получите кнопку поиска из разметки
  const searchButton = document.querySelector('.def-btn');

  // Добавьте обработчик события клика на кнопку поиска
  searchButton.addEventListener('click', () => {
    const inputValue = inputSearch.value.trim().toLowerCase();
    searchReload(inputValue);
  });

  // Добавьте обработчик события нажатия клавиши на поле ввода
  inputSearch.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const inputValue = inputSearch.value.trim().toLowerCase();
      searchReload(inputValue);
    }
  });

  // Добавьте обработчик события фокуса на поле ввода
  inputSearch.addEventListener('focus', () => {
    let val = inputSearch.value.toLowerCase().trim();
    list.style.display = val.length > 0 ? "flex" : "none";
    searchReload(val);
  });

  // Добавьте обработчик события клика на весь документ
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.closest('.middle')) {
      list.style.display = "none";
    }
  });

  // Обновите обработчик события input на поле ввода
  inputSearch.oninput = () => {
    let val = inputSearch.value.toLowerCase().trim();
    list.style.display = val.length > 0 ? "flex" : "none";
  
    if (val.length >= 3) {
      searchReload(val);
    } else {
      list.innerHTML = "";
    }
  };
}


header()