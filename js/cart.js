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

  let total = 0.0;
  let price = 0;
  let sum = 0;
  const delivery = 3;

  cart.forEach((prod) => {
    price = prod.price;
    sum += price;
    total = sum + delivery;

    sumContainer.innerHTML = `$${sum.toFixed(2)}`;
    totalContainer.innerHTML = `$${total.toFixed(2)}`;
    createHTML(prod);
  });
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

const removeProdBtn = document.querySelectorAll(".remove-prod");

removeProdBtn.forEach((btn) => {
  btn.onclick = function () {
    const cart = getCart();

    let id = this.dataset.remove;
    console.log(id);

    const updatedCart = cart.filter((prod) => prod.id !== id);
    console.log(updatedCart);
    //addToCart(updatedCart);
  };
});

function createHTML(prod) {
  container.innerHTML += `
    <div class="cart__prod d-grid mb-4">
      <a href="product_specific.html?id=${prod.id}" class="d-flex">
        <img src="${baseUrl}${prod.image.formats.small.url}" class="cart__img" alt="${prod.image.alternativeText}" />
        <p class="cart__title ml-4">${prod.title}</p>
      </a>
      <p class="cart__price">$${prod.price}</p>
      <i class="fa-solid fa-xmark remove-prod mr-2" data-remove="${prod.id}"><span class="sr-only">Remove product</span></i>
    </div>
  `;
}
