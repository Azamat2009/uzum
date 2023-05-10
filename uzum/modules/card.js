let baseURL = "http://localhost:3000/goods";
let container = document.querySelector('.left');
// Создаем элементы
let right = document.createElement("div");
let plusBtn = document.createElement("button");
let minusBtn = document.createElement("button");
let countSpan = document.createElement("span");


let productCard = document.createElement('div');
let leftCard = document.createElement('div');
let image = document.createElement('img');
let rightCard = document.createElement('div');
let heading = document.createElement('h3');
let price = document.createElement('span');
let deleteButton = document.createElement('button');

price.classList.add("price")
productCard.classList.add("product-card")
leftCard.classList.add("left-card")
rightCard.classList.add("right-card")
plusBtn.classList.add("plus")
minusBtn.classList.add('minus')
right.classList.add("right");
deleteButton.classList.add("delete")

image.src = '/public/img/cftak6nhj8j9g698g33g (1).png';
image.alt = '';
plusBtn.style.marginTop = "8px"
plusBtn.style.fontSize = "24px"
plusBtn.innerHTML = "+";
minusBtn.innerHTML = "-";
countSpan.innerHTML = "0";
heading.innerHTML = 'Cтиральный порошок Tide, Color Lenor Touch, автомат, 3 кг';
deleteButton.innerHTML = 'Удалить';

leftCard.appendChild(image);
right.append(minusBtn);
right.append(countSpan);
right.append(plusBtn);
rightCard.appendChild(heading);
rightCard.appendChild(price);
rightCard.appendChild(right);
rightCard.appendChild(deleteButton);

productCard.appendChild(leftCard);
productCard.appendChild(rightCard);



container.appendChild(productCard);


let count = 0;



const savedProduct = localStorage.getItem('selectedProduct');
if (savedProduct) {
  const selectedProduct = JSON.parse(savedProduct);

  heading.innerHTML = selectedProduct.title
  price.innerHTML = selectedProduct.price + " cум"

  
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
}