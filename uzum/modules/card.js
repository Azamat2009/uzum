let container = document.querySelector('.left');
// Создаем элементы


let count = 0;

const savedProducts = localStorage.getItem('selectedProducts');
if (savedProducts) {
  const selectedProducts = JSON.parse(savedProducts);

  // Перебираем все выбранные товары
  selectedProducts.forEach(selectedProduct => {
    const productCard = document.createElement('div');

productCard.classList.add('product-card');

const leftCard = document.createElement('div');
leftCard.classList.add('left-card');

const image = document.createElement('img');
image.src = selectedProduct.media[0];
image.alt = selectedProduct.title;
leftCard.appendChild(image);

const rightCard = document.createElement('div');
rightCard.classList.add('right-card');

const heading = document.createElement('h3');
heading.innerHTML = selectedProduct.title;
rightCard.appendChild(heading);

const price = document.createElement('span');
price.classList.add('price');
price.innerHTML = selectedProduct.price + ' cум';
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
rightCard.append(right)

const deleteButton = document.createElement('button');
deleteButton.classList.add('delete');
deleteButton.innerHTML = 'Удалить';
rightCard.appendChild(deleteButton);

productCard.appendChild(leftCard);
productCard.appendChild(rightCard);
container.appendChild(productCard);


    // Устанавливаем значения элементам на основе свойств выбранного товара
    heading.innerHTML = selectedProduct.title;
    price.innerHTML = selectedProduct.price + " cум";
    image.src = selectedProduct.media[0];
    image.alt = selectedProduct.title;

    // Добавляем обработчики событий
    plusBtn.addEventListener("click", () => {
      count++;
      countSpan.textContent = count;
    });

    minusBtn.addEventListener("click", () => {
      count--;
      countSpan.textContent = count;
    });

    // Добавляем карточку товара в контейнер
    container.appendChild(productCard);
  });
}

