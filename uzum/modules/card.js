import axios from "axios";

const reloadCartItems = (arr, place) => {


  let container = document.querySelector('.left');

  let count = 0;

  const savedProducts = localStorage.getItem('selectedProducts');
  if (savedProducts) {
    const selectedProducts = JSON.parse(savedProducts);

    if (savedProducts.length === 0) {
      let cat = document.querySelector(".cat")
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

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.innerHTML = 'Удалить';
      rightCard.appendChild(deleteButton);
      productPage.classList.add("productPage")

      productCard.append(leftCard)
      productCard.appendChild(rightCard);
      container.appendChild(productCard);

      heading.innerHTML = selectedProduct.title;
      price.innerHTML = selectedProduct.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + " сум"
      image.src = selectedProduct.media[0];
      image.alt = selectedProduct.title;

      plusBtn.addEventListener("click", () => {
        count++;
        countSpan.textContent = count;
      });

      minusBtn.addEventListener("click", () => {
        count--;
        countSpan.textContent = count;
      });

      container.appendChild(productCard);
    });

  } else {
    let cardFlex = document.querySelector(".card-flex")
    let zagolovok = document.querySelector("h1")
    zagolovok.style.display = "none"
    cardFlex.style.display = "none"
    let cat = document.querySelector(".cat")
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
