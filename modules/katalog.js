let baseURL = "http://localhost:3000/goods";
let cardsDiv = document.querySelector(".cards");
let selectedProducts = [];
let lattliv = document.getElementById('lattliv');
let ssmart = document.getElementById('ssmart');
let onemore = document.getElementById('1more');
let sevsaber = document.getElementById('7saber');
let hagibis = document.getElementById('hagibis');
let novey = document.getElementById('novey');
let categoriesAll = document.getElementById('all');
let categories1 = document.getElementById('categories1');
let categories2 = document.getElementById('categories2');
let categories3 = document.getElementById('categories3');
let categories4 = document.getElementById('categories4');
let categories5 = document.getElementById('categories5');
let title = document.getElementById("kategory")

export function createGoods() {
  fetch(baseURL)
    .then(res => res.json())
    .then(goods => {
      cardsDiv.innerHTML = "";

      goods.forEach(good => {        
        const cardDiv = createCardElement(good);
        cardsDiv.appendChild(cardDiv);
      });
    })
    .catch(err => console.error(err));
}

function createCardElement(good) {
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
  cardsDiv.appendChild(cardDiv);

  return cardDiv;
}

function filterByHighRating() {
  fetch(baseURL)
    .then(res => res.json())
    .then(goods => {
      cardsDiv.innerHTML = "";

      const highRatingGoods = goods.filter(good => good.rating >= 4);

      highRatingGoods.forEach(good => {
        const cardDiv = createCardElement(good);
        cardsDiv.appendChild(cardDiv);
      });
    })
    .catch(err => console.error(err));
}


function updateGoods() {
  let selectedBrands = [];
  if (lattliv.checked) selectedBrands.push("latt liv");
  if (ssmart.checked) selectedBrands.push("ssmart");
  if (onemore.checked) selectedBrands.push("1more");
  if (sevsaber.checked) selectedBrands.push("7saber");
  if (hagibis.checked) selectedBrands.push("hagibis");
  if (novey.checked) selectedBrands.push("novey");

  let selectedOption = document.getElementById("kategories").value;

  if (selectedOption === "bigRating") {
    filterByHighRating();
  } else {
    fetch(baseURL)
      .then(res => res.json())
      .then(goods => {
        cardsDiv.innerHTML = "";

        goods.forEach(good => {
          if (selectedBrands.length === 0 || selectedBrands.includes(good.brand)) {
            if (selectedOption === "cheaper" && good.price <= 100000) {
              const cardDiv = createCardElement(good);
              cardsDiv.appendChild(cardDiv);
            } else if (selectedOption === "expensive" && good.price > 100000) {
              const cardDiv = createCardElement(good);
              cardsDiv.appendChild(cardDiv);
            } else if (selectedOption !== "cheaper" && selectedOption !== "expensive") {
              const cardDiv = createCardElement(good);
              cardsDiv.appendChild(cardDiv);
            }
          }
        });
      })
      .catch(err => console.error(err));
  }
}

document.getElementById("kategories").addEventListener("change", updateGoods);

createGoods();



function updateCategory(category) {
  categoriesAll.classList.remove('category-active');
  categories1.classList.remove('category-active');
  categories2.classList.remove('category-active');
  categories3.classList.remove('category-active');
  categories4.classList.remove('category-active');
  categories5.classList.remove('category-active');

  if (category === "all") {
    categoriesAll.classList.add('category-active');
  } else if (category === "furniture") {
    categories1.classList.add('category-active');
  } else if (category === "PC") {
    categories2.classList.add('category-active');
  } else if (category === "audio") {
    categories3.classList.add('category-active');
  } else if (category === "TV") {
    categories4.classList.add('category-active');
  } else if (category === "kitchen") {
    categories5.classList.add('category-active');
  }

  if (category === "all") {
    title.innerHTML = "Все категории";
  } else if (category === "furniture") {
    title.innerHTML = "Мебель";
  } else if (category === "PC") {
    title.innerHTML = "Компьютеры";
  } else if (category === "audio") {
    title.innerHTML = "Аудио";
  } else if (category === "TV") {
    title.innerHTML = "Телевизоры";
  } else if (category === "kitchen") {
    title.innerHTML = "Кухонная техника";
  }

  fetch(baseURL)
    .then(res => res.json())
    .then(goods => {
      cardsDiv.innerHTML = "";

      goods.forEach(good => {
        if (category === "all" || good.type === category) {
          const cardDiv = createCardElement(good);
          cardsDiv.appendChild(cardDiv);
        }
      });
    })
    .catch(err => console.error(err));
}



lattliv.addEventListener('change', updateGoods);
ssmart.addEventListener('change', updateGoods);
onemore.addEventListener('change', updateGoods);
sevsaber.addEventListener('change', updateGoods);
hagibis.addEventListener('change', updateGoods);
novey.addEventListener('change', updateGoods);
categoriesAll.addEventListener('click', () => updateCategory("all"));
categories1.addEventListener('click', () => updateCategory("furniture"));
categories2.addEventListener('click', () => updateCategory("PC"));
categories3.addEventListener('click', () => updateCategory("audio"));
categories4.addEventListener('click', () => updateCategory("TV"));
categories5.addEventListener('click', () => updateCategory("kitchen"));

createGoods();

document.addEventListener("DOMContentLoaded", function() {
  var minPriceInput = document.getElementById("minPrice");
  var maxPriceInput = document.getElementById("maxPrice");

    minPriceInput.addEventListener("input", updateGoods);
    maxPriceInput.addEventListener("input", updateGoods);

  function updateGoods() {
    var minPrice = Number(minPriceInput.value);
    var maxPrice = Number(maxPriceInput.value);

    cardsDiv.innerHTML = "";


    fetch(baseURL)
      .then((res) => res.json())
      .then((goods) => {
        goods.forEach((good) => {
          if (good.price >= minPrice && good.price <= maxPrice) {
            function createCardElement(good) {

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
            cardsDiv.appendChild(cardDiv);
              return cardDiv;
            }
            const cardDiv = createCardElement(good);

            cardsDiv.appendChild(cardDiv);
          }
        });
      })
      .catch((err) => console.error(err));
  }
});


document.getElementById("budget").addEventListener("input", function () {
    var rangeValue = this.value;
    var rangeNumber = document.querySelector(".range-number");
    rangeNumber.textContent = rangeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  });
  document.getElementById("budget").addEventListener("change", function () {
    var rangeValue = this.value;
  
    var cardsDiv = document.querySelector(".cards");
    cardsDiv.innerHTML = "";
  
    fetch(baseURL)
      .then((res) => res.json())
      .then((goods) => {
        goods.forEach((good) => {
          if (good.price <= rangeValue) {
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
            cardsDiv.appendChild(cardDiv);
          }
        });
      })
      .catch((err) => console.error(err));
  });
    

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
  $('.range-number_item').html(range);
 });