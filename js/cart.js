import createMenu from "./ui/createMenu.js";
import { clearCart, getCart } from "./utils/storage.js";
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
  const subtotalContainer = document.querySelector(".cost__subtotal");

  let total = 0;
  let price = 0;
  const delivery = 3;

  cart.forEach((prod) => {
    price = prod.price;
    total += price;
    let subtotal = total + delivery;

    subtotalContainer.innerHTML = `$ ${subtotal}`;

    createHTML(prod);
  });
}

viewProducts();

const emptyBtn = document.querySelector(".empty");
emptyBtn.onclick = function () {
  clearCart();

  location.href = "cart.html";

  const cart = getCart();
  createHTML(cart);

  displayMessage(
    "normal-message",
    "No products added to cart.",
    ".message-container"
  );
};

function createHTML(prod) {
  container.innerHTML += `
    <div class="cart__prod">
      <div>
        <img src="${baseUrl}${prod.image.formats.small.url}" class="cart__img" alt="${prod.image.alternativeText}" />
        <p class="prod-title cart__title">${prod.title}</p>
      </div>
      <p class="cart__price">$ ${prod.price}</p>
    </div>
  `;
}
