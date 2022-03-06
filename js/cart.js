import createMenu from "./ui/createMenu.js";
import { clearCart, getCart } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import { cartAmount } from "./ui/cartAmount.js";
import displayMessage from "./ui/displayMessage.js";

createMenu();
cartAmount();
emptyCartMessage();

const container = document.querySelector(".cart__items");
const totalContainer = document.querySelector(".cost__total");
const sumContainer = document.querySelector(".cost__sum");

function viewProducts() {
  const cart = getCart();

  let total = 0;
  let price = 0;
  let sum = 0;
  const delivery = 3;

  cart.forEach((prod) => {
    price = parseFloat(prod.price);
    sum += price;
    total = sum + delivery;

    sumContainer.innerHTML = `$${sum}`;
    totalContainer.innerHTML = `$${total}`;
    createHTML(prod);
  });
}

viewProducts();

const emptyBtn = document.querySelector(".empty");
emptyBtn.onclick = function () {
  clearCart();

  document.querySelector(".cart-container").style.display = "none";
  cartAmount();

  emptyCartMessage();
};

function emptyCartMessage() {
  const cart = getCart();

  if (cart.length === 0) {
    document.querySelector(".cart-container").style.display = "none";
    displayMessage(
      "normal-message",
      "No products added to cart.",
      ".message-container"
    );
  }
}

function createHTML(prod) {
  container.innerHTML += `
    <div class="cart__prod d-grid mb-4">
      <a href="product_specific.html?id=${prod.id}" class="d-flex">
        <img src="${baseUrl}${prod.image.url}" class="cart__img" alt="${prod.image.alternativeText}" />
        <p class="cart__title ml-4">${prod.title}</p>
      </a>
      <p class="cart__price">$${prod.price}</p>
      <i class="fa-solid fa-xmark remove-prod mr-2" data-remove="${prod.id}"><span class="sr-only">Remove product</span></i>
    </div>
  `;
}
