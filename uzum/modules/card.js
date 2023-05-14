import axios from "axios";
let baseURL = "http://localhost:3000/goods";
let totalItemCount = 0;
let totalSaleAmount = 0;
const reloadCartItems = (arr, place) => {
  let totalPrice = 0; 
  let container = document.querySelector('.left');

  const savedProducts = localStorage.getItem('selectedProducts');
  if (savedProducts) {
    const selectedProducts = JSON.parse(savedProducts);

    if (selectedProducts.length === 0) {
      let cat = document.querySelector(".cat");
      const h1 = document.querySelector(".text-inactive");
      const p = document.querySelector(".p-inactive");
      const a = document.querySelector(".a-inactive");

      cat.classList.replace("cat", "cat-active");
      h1.classList.replace("text-inactive", "text-active");
      p.classList.replace("p-inactive", "p-active");
      a.classList.replace("a-inactive", "a-active");
    }

    let totalMoney = document.getElementById("total");
    let totalTovar = document.getElementById("total-tovar");
    let totalSale = document.getElementById("total-sale");


    selectedProducts.forEach(selectedProduct => {
      let count = 0;

      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      const leftCard = document.createElement('div');
      leftCard.classList.add('left-card');

      const image = document.createElement('img');
      const productPage = document.createElement("a");
      productPage.href = `/pages/tovar.html?id=${selectedProduct.id}`;
      image.src = selectedProduct.media[0];
      image.alt = selectedProduct.title;
      productPage.appendChild(image);
      leftCard.append(productPage);

      const rightCard = document.createElement('div');
      rightCard.classList.add('right-card');

      const heading = document.createElement('h3');
      heading.innerHTML = selectedProduct.title;
      rightCard.appendChild(heading);

      const price = document.createElement('span');
      price.classList.add('price');
      rightCard.appendChild(price);

      const right = document.createElement('div');
      right.classList.add('right');

      const minusBtn = document.createElement('button');
      minusBtn.classList.add('minus');
      minusBtn.innerHTML = '-';
      right.appendChild(minusBtn);

      const countSpan = document.createElement('span');
      countSpan.innerHTML = '0';
      right.appendChild(countSpan);

      const plusBtn = document.createElement('button');
      plusBtn.classList.add('plus');
      plusBtn.innerHTML = '+';
      right.appendChild(plusBtn);
      rightCard.appendChild(right);

      productPage.classList.add("productPage");

      productCard.append(leftCard);
      productCard.appendChild(rightCard);
      container.appendChild(productCard);

      fetch(`${baseURL}/${selectedProduct.id}`)
        .then(res => res.json())
        .then(data => {
          const newPrice = Math.floor(selectedProduct.price * (100 - data.salePercentage) / 100);
          price.innerHTML = newPrice.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + " сум";
          totalPrice += newPrice * count;

          const deleteButton = document.createElement('button');
          deleteButton.classList.add('delete');
          deleteButton.innerHTML = 'Удалить';
          rightCard.appendChild(deleteButton);
          productPage.classList.add("productPage");

          productCard.append(leftCard);
          productCard.appendChild(rightCard);
          container.appendChild(productCard);

          heading.innerHTML = selectedProduct.title;
          image.src = selectedProduct.media[0];
          image.alt = selectedProduct.title;

          deleteButton.addEventListener("click", () => {
            const savedProducts = localStorage.getItem('selectedProducts');
            if (savedProducts) {
              const selectedProducts = JSON.parse(savedProducts);
              const updatedProducts = selectedProducts.filter(product => product.id !== selectedProduct.id);
              localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
            }

            productCard.remove();
          });

          plusBtn.addEventListener("click", () => {
            count++;
            countSpan.textContent = count;
            totalPrice += newPrice;
            totalItemCount++;
            localStorage.setItem('totalPrice', totalPrice);
            localStorage.setItem('totalItemCount', totalItemCount);
            totalMoney.textContent = totalPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + " сум";
            totalTovar.textContent = "Итого товаров: " + totalItemCount;
            if (savedProducts.salePercentage > 0 ) {
              totalSaleAmount = Math.floor(savedProducts.price * (100 - savedProducts.salePercentage) / 100);
              // selectedProduct.price * (data.salePercentage / 100); 
            } else {
              totalSaleAmount = selectedProduct.price
            }
            console.log(totalSaleAmount);
            console.log(JSON.stringify(savedProducts.price));
            console.log(savedProducts.salePercentage);
          });

          minusBtn.addEventListener("click", () => {
            if (count > 0) {
              count--;
              countSpan.textContent = count;
              totalPrice -= newPrice;
              totalItemCount--;
              localStorage.setItem('totalPrice', totalPrice);
              localStorage.setItem('totalItemCount', totalItemCount);
              totalMoney.textContent = totalPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + " сум";
              totalTovar.textContent = "Итого товаров: " + totalItemCount;
            }
          });

          totalSale.innerHTML = totalSaleAmount.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + " сум";
        })
        .catch(err => console.error(err));
    });

    totalMoney.textContent = totalPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + " сум";
    totalTovar.textContent = "Итого товаров: " + totalItemCount;

    totalSaleAmount = totalMoney
  } else {
    let cardFlex = document.querySelector(".card-flex");
    let zagolovok = document.querySelector("h1");
    zagolovok.style.display = "none";
    cardFlex.style.display = "none";
    let cat = document.querySelector(".cat");
    const h1 = document.querySelector(".text-inactive");
    const p = document.querySelector(".p-inactive");
    const a = document.querySelector(".a-inactive");

    cat.classList.replace("cat", "cat-active");
    h1.classList.replace("text-inactive", "text-active");
    p.classList.replace("p-inactive", "p-active");
    a.classList.replace("a-inactive", "a-active");
  }
};

reloadCartItems();
