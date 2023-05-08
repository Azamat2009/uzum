let baseURL = "http://localhost:3000/goods"
let id = location.search

fetch(baseURL + id)
    .then(res => res.json())
    .then(user => {
        user = user[0]


        let app = document.querySelector(".tovar-right")
        let tovarBottomDiv = document.querySelector(".tovar-bottom")

        let tovarFlex = document.createElement("div");
        tovarFlex.classList.add("tovar-flex");


        let tovTitle = document.createElement("h2");
        tovTitle.textContent = user.title;

        let prices = document.createElement("div");
        prices.classList.add("prices");


        let tovOldPrice = document.createElement("span");
        tovOldPrice.id = "tov-old-price";
        tovOldPrice.innerHTML = user.price + " сум";

         let newPageTitle = "Купить - " + user.title;
        document.title = newPageTitle;
        
        let tovNewPrice = document.createElement("span");
        tovNewPrice.id = "tov-new-price";
        tovNewPrice.textContent =  ""           

        fetch(`${baseURL}/${user.id}`)
        .then(res => res.json())
        .then(data => {
            const newPrice = user.price * (100 - data.salePercentage) / 100;
            tovNewPrice.textContent = newPrice.toFixed(0) + " сум"; 
        })
        .catch(err => console.error(err));;

        prices.appendChild(tovNewPrice);
        prices.appendChild(tovOldPrice);

        let plus = document.createElement("div");
        plus.classList.add("plus");

        let hr = document.createElement("hr");

        let description = document.createElement("p");
        description.innerHTML = "Станьте востребованным разработчиком. Вы изучите основы программирования и основные концепции компьютерных наук, цифровые технологии, операционные системы, программное обеспечение, базы данных, системы аналитики, языки программирования и многое другое. Познакомитесь с тестированием и системным анализом. На программе сможете сделать осознанный выбор специализации и технологий, прокачаться в выбранном направлении.";

        let btns = document.createElement("div");
        btns.classList.add("btns");

        let addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("add-cart");
        addToCartBtn.textContent = "Добавить в корзину";

        let addToFavBtn = document.createElement("button");
        addToFavBtn.classList.add("add-fav");
        addToFavBtn.textContent = "Добавить в избранное";

        btns.appendChild(addToCartBtn);
        btns.appendChild(addToFavBtn);

        //bottom

        let tovarBottom = document.createElement("div");

        let tovBottomTitle = document.createElement("h2");
        tovBottomTitle.textContent = "Описание товара";

        let tovBottomDescription = document.createElement("p");
        tovBottomDescription.innerHTML = user.description;

        tovarBottom.appendChild(tovBottomTitle);
        tovarBottom.appendChild(tovBottomDescription);


        app.appendChild(document.createElement("br"));
        app.appendChild(tovTitle);
        app.appendChild(document.createElement("br"));
        app.appendChild(document.createElement("br"));
        app.appendChild(prices);
        app.append(right)
        app.appendChild(document.createElement("br"));
        app.appendChild(hr);
        app.appendChild(document.createElement("br"));
        app.appendChild(description);
        app.appendChild(document.createElement("br"));
        app.appendChild(btns);


        app.appendChild(tovarFlex);
        tovarBottomDiv.appendChild(tovarBottom);
})


// плюс и минус
let right = document.createElement("div");
let plusBtn = document.createElement("button");
let minusBtn = document.createElement("button");
let countSpan = document.createElement("span");

right.classList.add("right");

plusBtn.style.marginTop = "8px"
plusBtn.style.fontSize = "24px"
plusBtn.innerHTML = "+";
minusBtn.innerHTML = "-";
countSpan.innerHTML = "0";


let count = 0;
plusBtn.addEventListener("click", () => {
    count++;
    countSpan.textContent = count;
});
minusBtn.addEventListener("click", () => {
    count--;
    countSpan.textContent = count;
});
right.append(minusBtn);
right.append(countSpan);
right.append(plusBtn);


// похожие товары

let cards = document.querySelector(".cards")
fetch(baseURL)
    .then(res => res.json())
    .then(goods => {
        goods.slice(40, 45).forEach(good => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card");


            const img1 = document.createElement("img");
            img1.src = good.media[0];
            img1.classList.add("productImage")

            let productPage = document.createElement("a")
            productPage.href = "/pages/tovar.html"
            productPage.append(img1)

            const img2 = document.createElement("img");
            img2.classList.add("heart");
            img2.src = "/public/icons/heart.svg";
            img2.alt = "";

            const img3 = document.createElement("img");
            img3.classList.add("heart2");
            img3.src = "/public/icons/heart 1.png";
            img3.alt = "";

            const h3 = document.createElement("h3");
            h3.innerHTML = good.title;

            const beforeSale = document.createElement("span");
            beforeSale.classList.add("before-sale");
            beforeSale.textContent = good.price + " сум"

            const bottomCardDiv = document.createElement("div");
            bottomCardDiv.classList.add("bottom-card");

            const span2 = document.createElement("span");
            span2.textContent = good.price;

            const img4 = document.createElement("img");
            img4.id = "cardImg";
            img4.src = "/public/icons/card.svg";
            img4.alt = "";

            bottomCardDiv.appendChild(span2);
            bottomCardDiv.appendChild(img4);

            cardDiv.appendChild(productPage);
            cardDiv.appendChild(img2);
            cardDiv.appendChild(img3);
            cardDiv.appendChild(h3);
            cardDiv.appendChild(beforeSale);
            cardDiv.appendChild(bottomCardDiv);

            fetch(`${baseURL}/${good.id}`)
                .then(res => res.json())
                .then(data => {
                    const newPrice = good.price * (100 - data.salePercentage) / 100;
                    span2.textContent = newPrice.toFixed(0) + " сум"; 
                })
                .catch(err => console.error(err));

            cards.append(cardDiv);
        });
    })
    .catch(err => console.error(err));



//slide to top
const backToTopBtn = document.querySelector('#back-to-top-btn');


window.addEventListener('scroll', () => {
  if (window.pageYOffset > 0) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }

  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    backToTopBtn.style.bottom = '80px'; // измените значение, если нужно
  } else {
    backToTopBtn.style.bottom = '20px'; // измените значение, если нужно
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});