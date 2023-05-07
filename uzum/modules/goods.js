let baseURL = "http://localhost:3000/goods"
let cards = document.querySelector('.cards')
let cards2 = document.querySelector('.cards2')
let cards3 = document.querySelector('.cards3')

fetch(baseURL)
    .then(res => res.json())
    .then(goods => {
        goods.slice(0, 15).forEach(good => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card");


            const img1 = document.createElement("img");
            img1.src = good.media[0];
            img1.classList.add("productImage")

            let productPage = document.createElement("a")
            productPage.href = `/pages/tovar.html?id=${good.id}`
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

    fetch(baseURL)
    .then(res => res.json())
    .then(goods => {
        goods.slice(15, 20).forEach(good => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card");


            const img1 = document.createElement("img");
            img1.src = good.media[0];
            img1.classList.add("productImage")

            let productPage = document.createElement("a")
            productPage.href = `/pages/tovar.html?id=${good.id}`
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

            cards2.append(cardDiv);
        });
    })
    .catch(err => console.error(err));

    fetch(baseURL)
    .then(res => res.json())
    .then(goods => {
        goods.slice(20, 30).forEach(good => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card");


            const img1 = document.createElement("img");
            img1.src = good.media[0];
            img1.classList.add("productImage")

            let productPage = document.createElement("a")
            productPage.href = `/pages/tovar.html?id=${good.id}`
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

            cards3.append(cardDiv);
        });
    })
    .catch(err => console.error(err));

    