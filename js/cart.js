import createMenu from "./ui/createMenu.js";
import { addToCart, clearCart, getCart } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import { cartAmount } from "./ui/cartAmount.js";
import displayMessage from "./ui/displayMessage.js";

createMenu();
cartAmount();

const cart = getCart();

if (cart.length === 0) {
  document.querySelector(".cart-container").style.display = "none";
  displayMessage(
    "normal-message",
    "No products added to cart.",
    ".message-container"
  );
}

const container = document.querySelector(".cart__items");

function viewProducts() {
  const totalContainer = document.querySelector(".cost__total");
  const sumContainer = document.querySelector(".cost__sum");

  const cart = getCart();

  /*
   */
  /*   const prod = cart.find((item) => item.id === id);
  console.log("prod", prod);

  if (!prod) {
    cart.push(prod);
    addToCart(cart);
  } */
  let id = 0;
  let total = 0.0;
  let price = 0;
  let sum = 0;
  const delivery = 3;

  cart.forEach((prod) => {
    price = prod.price;
    sum += price;
    total = sum + delivery;

    let counter = 0;
    id = prod.id;
    const prodNum = cart.filter((item) => item.id === id).length;

    counter = prodNum;
    console.log("prod amount", prodNum);

    sumContainer.innerHTML = `$ ${sum.toFixed(2)}`;
    totalContainer.innerHTML = `$ ${total.toFixed(2)}`;
    createHTML(prod, counter);
  });

  const newCart = cart.filter((item) => item.id !== id);
  console.log(newCart);
}

viewProducts();

const emptyBtn = document.querySelector(".empty");
emptyBtn.onclick = function () {
  clearCart();

  const cart = getCart();
  createHTML(cart);

  displayMessage(
    "normal-message",
    "No products added to cart.",
    ".message-container"
  );
};

function createHTML(prod, quantity) {
  container.innerHTML += `
    <div class="cart__prod d-grid">
      <div class="d-flex">
        <img src="${baseUrl}${prod.image.formats.small.url}" class="cart__img" alt="${prod.image.alternativeText}" />
        <p class="cart__title">${prod.title}</p>
      </div>
      <p class="quantity">${quantity}</p>
      <p class="cart__price">$ ${prod.price}</p>
      <i class="fa-solid fa-xmark remove-prod"><span class="sr-only">Remove product</span></i>
    </div>
  `;
}
