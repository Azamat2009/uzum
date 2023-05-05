// create // a
let tovarRight = document.querySelector(".tovar-right")
let right = document.createElement("div");
let plusBtn = document.createElement("button");
let minusBtn = document.createElement("button");
let countSpan = document.createElement("span");

// styling // b

// class

right.classList.add("right");

// text

plusBtn.style.marginTop = "8px"
plusBtn.style.fontSize = "23px"
plusBtn.innerHTML = "+";
minusBtn.innerHTML = "-";
countSpan.innerHTML = "0";

// attributes


// append // c
tovarRight.append(right);


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