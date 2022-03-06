import { cartAmount } from "./ui/cartAmount.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./ui/createMenu.js";
import otherProds from "./ui/otherProds.js";
import { getCart, getToken, getUsername } from "./utils/storage.js";
import toggleProductCart from "./ui/toggleProduct.js";

createMenu();
otherProds();
cartAmount();

const params = new URLSearchParams(document.location.search);
const id = params.get("id");

if (!id) location.href = "index.html";

const token = getToken();

const url = baseUrl + "/products/" + id;
const container = document.querySelector(".prod-specific");

(async function () {
  try {
    const response = await fetch(url);
    const prod = await response.json();

    document.querySelector("title").innerHTML = `Shoes Up | ${prod.title}`;
    document.querySelector("h1").innerHTML = `${prod.title}`;

    renderProduct(prod);
  } catch (error) {
    console.log(error);
  }
})();

function renderProduct(prod) {
  let icon = "fa-plus";
  let text = "Add to cart";

  const cart = getCart();
  const product = cart.find((item) => parseInt(item.id) === prod.id);

  if (product) {
    icon = "fa-minus";
    text = "Remove";
  }

  container.innerHTML = `
    <a href="edit_product.html?id=${prod.id}" class="edit-prod-btn position-absolute">
      <i class="fa-solid fa-pen pr-1"></i>
      Edit product
    </a>

    <div class="prod-specific__img mb-2">
      <img src="${baseUrl}${prod.image.formats.small.url}" alt="${prod.image.alternativeText}" />
    </div>
    
    <div class="prod-specific__info">
      <p class="prod-specific__price">$${prod.price}</p>
      <p class="prod-specific__desc mb-4">${prod.description}</p>

      <div class="prod-specific__btn position-relative">
        <button class="btn btn-blue" id="buy" data-id="${prod.id}" data-title="${prod.title}"
          data-price="${prod.price}" data-desc="${prod.description}"
          data-img="${prod.image.formats.small.url}">
          <i class="fa-solid ${icon} mr-2"></i>
          <span class="btn-text">${text}</span>
        </button>
      </div>
    </div>
  `;

  if (token) {
    document.querySelector(".edit-prod-btn").style.display = "block";
    document.querySelector(".prod-specific__btn").style.marginBottom = "28px";
  } else {
    document.querySelector(".edit-prod-btn").style.display = "none";
  }

  const addToCartBtns = document.querySelectorAll("#buy");

  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", toggleProductCart);
  });
}
