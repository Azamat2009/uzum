let baseURL = "http://localhost:3000/goods";
let cards = document.querySelectorAll(".cards")
let selectedProducts = [];


export function createGoods() {
  fetch(baseURL)
  .then(res => res.json())
  .then(goods => {
    let baseURL = "http://localhost:3000/goods";
    goods.forEach(good => {
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
      img4.classList.add("card-img")

      productPage.href = `/pages/tovar.html?id=${good.id}`;
      heart.src = "/public/icons/heart.svg";
      heart.alt = "";
      heartActive.src = "/public/icons/heart 1.png";
      heartActive.alt = "";
      h3.innerHTML = good.title;
      span2.textContent = good.price;
      beforeSale.textContent = good.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + " сум"
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
                const isProductSelected = selectedProducts.some(product => product.id === good.id);
                if (!isProductSelected) {
                  selectedProducts.push(good);
                  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
                }
              });
      
              const savedProducts = localStorage.getItem('selectedProducts');
              if (savedProducts) {
                selectedProducts = JSON.parse(savedProducts);
              }


      fetch(`${baseURL}/${good.id}`)
        .then(res => res.json())
        .then(data => {
          const newPrice = good.price * (100 - data.salePercentage) / 100;
          span2.textContent = newPrice.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + " сум"
        })
        .catch(err => console.error(err));

      cards[0].append(cardDiv);
    });
  })
  .catch(err => console.error(err));
}

createGoods()

document.getElementById("budget").oninput = function () {
    var value = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.background = "linear-gradient(to right, #7000FF 0%, #7000FF " + value + "%, #ffff " + value + "%, #7000FF 100%)";
};

// добавление файла в quiz
$(".form-custom-file__input").change(function () {
    var d_name = [];
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
        d_name.push(" " + $(this).get(0).files[i].name);
    }
    $('#d_file').attr('data-text', d_name.join(", "));
    // $("#d_name").val(d_name.join(", "));
});

$('.range-number_item').html($('#budget').val());

$(document).on('input change', '#budget', function () {
    var range = $(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  console.log(range);
  $('.range-number_item').html(range);
 });

// const changePriceDiv = document.querySelector(".change-price");

// function createPriceRange() {
//   const minPrice = 50000;
//   const maxPrice = 5000000;
//   const step = 50000;

//   const priceRangeInput = document.createElement("input");
//   priceRangeInput.type = "range";
//   priceRangeInput.id = "price-range";
//   priceRangeInput.min = minPrice;
//   priceRangeInput.max = maxPrice;
//   priceRangeInput.step = step;

//   const minPriceLabel = document.createElement("span");
//   minPriceLabel.id = "min-price-label";
//   minPriceLabel.textContent = "Мин: " + minPrice;

//   const maxPriceLabel = document.createElement("span");
//   maxPriceLabel.id = "max-price-label";
//   maxPriceLabel.textContent = "Макс: " + maxPrice;

//   const priceFilterButton = document.createElement("button");
//   priceFilterButton.textContent = "Применить";
//   priceFilterButton.addEventListener("click", applyPriceFilter);

//   changePriceDiv.appendChild(priceRangeInput);
//   changePriceDiv.appendChild(minPriceLabel);
//   changePriceDiv.appendChild(maxPriceLabel);
//   changePriceDiv.appendChild(priceFilterButton);
// }

// function applyPriceFilter() {
//   const priceRangeInput = document.querySelector("#price-range");
//   const minPriceLabel = document.querySelector("#min-price-label");
//   const maxPriceLabel = document.querySelector("#max-price-label");

//   const selectedMinPrice = parseInt(priceRangeInput.value);
//   const selectedMaxPrice = parseInt(maxPriceLabel.textContent.split(":")[1].trim());

//   // Filter the products based on the selected price range
//   const filteredProducts = selectedProducts.filter(product => {
//     const productPrice = parseInt(product.price.replace(/\D/g, ""));
//     return productPrice >= selectedMinPrice && productPrice <= selectedMaxPrice;
//   });
// }
// applyPriceFilter()
// createPriceRange()