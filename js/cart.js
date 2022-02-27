import { baseUrl } from "./settings/api.js";
import createMenu from "./ui/createMenu.js";
import { addToCart, getCart } from "./utils/storage.js";

createMenu();

export default function addProducts() {
  const id = this.dataset.id;
  const cart = getCart();

  const product = cart.find((prod) => prod.id === parseInt(id));
  console.log("product", product);

  /*   cart.push(product);
  addToCart(cart); */

  console.log("cart", cart);
}

/*
const container = document.querySelector(".cart__items");

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
} */

/* const subtotal = document.querySelector(".cost-subtotal");
let total = 0;
let price = 0; */
