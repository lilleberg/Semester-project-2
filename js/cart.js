import { baseUrl } from "./settings/api.js";
import createMenu from "./ui/createMenu.js";
import { getCart } from "./utils/storage.js";

createMenu();

const container = document.querySelector(".cart__items");
const subtotal = document.querySelector(".cost-subtotal");

const cart = getCart();
let total = 0;
let price = 0;

function addProducts() {
  if (cart.length) {
    cart.forEach((prod) => {
      price = parseFloat(prod.price);
      total += price;

      createHTML(prod);
      subtotal.innerHTML = `${total}`;
    });
  }
}

function createHTML(prod) {
  container.innerHTML += `
    <div class="cart__prod">
      <div>
        <img src="${baseUrl}${prod.images.url}" class="cart__img" alt="${prod.images.alternativeText}" />
        <p class="prod-title cart__title>
      </div>
      <p class="cart__price">${prod.price}</p>
    </div>
  `;
}
