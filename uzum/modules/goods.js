let baseURL = "http://localhost:3000/goods";
let cards = document.querySelector('.cards');
let cards2 = document.querySelector('.cards2');
let cards3 = document.querySelector('.cards3');
let selectedProducts = [];

fetch(baseURL)
  .then(res => res.json())
  .then(goods => {
    goods.slice(0, 15).forEach(good => {
      const cardDiv = document.createElement("div");
      const img1 = document.createElement("img");
      let productPage = document.createElement("a");
      const heart = document.createElement("img");
      const heartActive = document.createElement("img");
      const h3 = document.createElement("h3");
      const beforeSale = document.createElement("span");
      const bottomCardDiv = document.createElement("div");
      const span2 = document.createElement("span");
      const img4 = document.createElement("img");
      cardDiv.classList.add("card");
      img1.classList.add("productImage");
      beforeSale.classList.add("before-sale");
      heart.classList.add("heart");
      heartActive.classList.add("heart2");
      bottomCardDiv.classList.add("bottom-card");

      productPage.href = `/pages/tovar.html?id=${good.id}`;
      heart.src = "/public/icons/heart.svg";
      heart.alt = "";
      heartActive.src = "/public/icons/heart 1.png";
      heartActive.alt = "";
      h3.innerHTML = good.title;
      span2.textContent = good.price;
      beforeSale.textContent = good.price + " сум";
      img1.src = good.media[0];
      img4.id = "cardImg";
      img4.src = "/public/icons/card.svg";
      img4.alt = "";

      bottomCardDiv.appendChild(span2);
      bottomCardDiv.appendChild(img4);
      productPage.append(img1);
      cardDiv.appendChild(productPage);
      cardDiv.appendChild(heart);
      cardDiv.appendChild(heartActive);
      cardDiv.appendChild(h3);
      cardDiv.appendChild(beforeSale);
      cardDiv.appendChild(bottomCardDiv);

      if (good.favourite) {
        heart.classList.add('heart-none');
        heartActive.classList.add('heart2-active');
      } else {
        heart.classList.remove('heart-none');
        heartActive.classList.remove('heart2-active');
      }

      heart.addEventListener('click', () => {
        if (!good.favourite) {
          heart.classList.add('heart-none');
          heartActive.classList.add('heart2-active');
          good.favourite = true;

          fetch(`${baseURL}/${good.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favourite: true })
          })
            .then(res => {
              if (!res.ok) {
                throw new Error('Failed to update favourite');
              }
              heart.classList.add('heart-none');
              heartActive.classList.add('heart2-active');
            })
            .catch(err => console.error(err));
        }
      });

      heartActive.addEventListener('click', () => {
        if (good.favourite) {
          heart.classList.remove('heart-none');
          heartActive.classList.remove('heart2-active');
          good.favourite = false;

          fetch(`${baseURL}/${good.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favourite: false })
          })
            .then(res => {
              if (!res.ok) {
                throw new Error('Failed to update favourite');
              }

              heart.classList.remove('heart-none');
              heartActive.classList.remove('heart2-active');
              })
              .catch(err => console.error(err));
              }
              });
              
              img4.addEventListener('click', () => {
                selectedProducts.push(good);
                localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
              });
              
              const savedProduct = localStorage.getItem('selectedProduct');
              if (savedProduct) {
              const selectedProduct = JSON.parse(savedProduct);
              }
              
          



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
      const img1 = document.createElement("img");
      let productPage = document.createElement("a")
      const heart = document.createElement("img");
      const heartActive = document.createElement("img");
      const h3 = document.createElement("h3");
      const beforeSale = document.createElement("span");
      const bottomCardDiv = document.createElement("div");
      const span2 = document.createElement("span");
      const img4 = document.createElement("img");
      cardDiv.classList.add("card");
      img1.classList.add("productImage")
      beforeSale.classList.add("before-sale");
      heart.classList.add("heart")
      heartActive.classList.add("heart2")
      bottomCardDiv.classList.add("bottom-card");

      productPage.href = `/pages/tovar.html?id=${good.id}`
      heart.src = "/public/icons/heart.svg";
      heart.alt = "";
      heartActive.src = "/public/icons/heart 1.png";
      heartActive.alt = "";
      h3.innerHTML = good.title;
      span2.textContent = good.price;
      beforeSale.textContent = good.price + " сум"
      img1.src = good.media[0];
      img4.id = "cardImg";
      img4.src = "/public/icons/card.svg";
      img4.alt = "";

      bottomCardDiv.appendChild(span2);
      bottomCardDiv.appendChild(img4);
      productPage.append(img1)
      cardDiv.appendChild(productPage);
      cardDiv.appendChild(heart);
      cardDiv.appendChild(heartActive);
      cardDiv.appendChild(h3);
      cardDiv.appendChild(beforeSale);
      cardDiv.appendChild(bottomCardDiv);

      if (good.favourite) {
        heart.classList.add('heart-none');
        heartActive.classList.add('heart2-active');
      } else {
        heart.classList.remove('heart-none');
        heartActive.classList.remove('heart2-active');
      }

      heart.addEventListener('click', () => {
        if (!good.favourite) {
          heart.classList.add('heart-none');
          heartActive.classList.add('heart2-active');
          good.favourite = true;

          fetch(`${baseURL}/${good.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favourite: true })
          })
            .then(res => {
              if (!res.ok) {
                throw new Error('Failed to update favourite');
              }
              heart.classList.add('heart-none');
              heartActive.classList.add('heart2-active');
            })
            .catch(err => console.error(err));
        }
      });

      heartActive.addEventListener('click', () => {
        if (good.favourite) {
          heart.classList.remove('heart-none');
          heartActive.classList.remove('heart2-active');
          good.favourite = false;

          fetch(`${baseURL}/${good.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favourite: false })
          })
            .then(res => {
              if (!res.ok) {
                throw new Error('Failed to update favourite');
              }
              heart.classList.remove('heart-none');
              heartActive.classList.remove('heart2-active');
            })
            .catch(err => console.error(err));
        }
      });



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
      const img1 = document.createElement("img");
      let productPage = document.createElement("a")
      const heart = document.createElement("img");
      const heartActive = document.createElement("img");
      const h3 = document.createElement("h3");
      const beforeSale = document.createElement("span");
      const bottomCardDiv = document.createElement("div");
      const span2 = document.createElement("span");
      const img4 = document.createElement("img");
      cardDiv.classList.add("card");
      img1.classList.add("productImage")
      beforeSale.classList.add("before-sale");
      heart.classList.add("heart")
      heartActive.classList.add("heart2")
      bottomCardDiv.classList.add("bottom-card");

      productPage.href = `/pages/tovar.html?id=${good.id}`
      heart.src = "/public/icons/heart.svg";
      heart.alt = "";
      heartActive.src = "/public/icons/heart 1.png";
      heartActive.alt = "";
      h3.innerHTML = good.title;
      span2.textContent = good.price;
      beforeSale.textContent = good.price + " сум"
      img1.src = good.media[0];
      img4.id = "cardImg";
      img4.src = "/public/icons/card.svg";
      img4.alt = "";

      bottomCardDiv.appendChild(span2);
      bottomCardDiv.appendChild(img4);
      productPage.append(img1)
      cardDiv.appendChild(productPage);
      cardDiv.appendChild(heart);
      cardDiv.appendChild(heartActive);
      cardDiv.appendChild(h3);
      cardDiv.appendChild(beforeSale);
      cardDiv.appendChild(bottomCardDiv);

      if (good.favourite) {
        heart.classList.add('heart-none');
        heartActive.classList.add('heart2-active');
      } else {
        heart.classList.remove('heart-none');
        heartActive.classList.remove('heart2-active');
      }

      heart.addEventListener('click', () => {
        if (!good.favourite) {
          heart.classList.add('heart-none');
          heartActive.classList.add('heart2-active');
          good.favourite = true;

          fetch(`${baseURL}/${good.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favourite: true })
          })
            .then(res => {
              if (!res.ok) {
                throw new Error('Failed to update favourite');
              }
              heart.classList.add('heart-none');
              heartActive.classList.add('heart2-active');
            })
            .catch(err => console.error(err));
        }
      });

      heartActive.addEventListener('click', () => {
        if (good.favourite) {
          heart.classList.remove('heart-none');
          heartActive.classList.remove('heart2-active');
          good.favourite = false;

          fetch(`${baseURL}/${good.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favourite: false })
          })
            .then(res => {
              if (!res.ok) {
                throw new Error('Failed to update favourite');
              }
              heart.classList.remove('heart-none');
              heartActive.classList.remove('heart2-active');
            })
            .catch(err => console.error(err));
        }
      });



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