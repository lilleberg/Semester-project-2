import { cartAmount } from "./ui/cartAmount.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./ui/createMenu.js";
import otherProds from "./ui/otherProds.js";
import { getCart } from "./utils/storage.js";
import toggleProductCart from "./ui/toggleProduct.js";

createMenu();
otherProds();
cartAmount();

const params = new URLSearchParams(document.location.search);
const id = params.get("id");

if (!id) location.href = "index.html";

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

  const cart = getCart();
  const product = cart.find((item) => {
    return parseInt(item.id) === prod.id;
  });

  if (product) icon = "fa-minus";

  container.innerHTML = `
    <div class="prod-specific__img mb-2">
      <img src="${baseUrl}${prod.image.formats.small.url}" alt="${prod.image.alternativeText}" />
    </div>
    
    <div class="prod-specific__info">
      <p class="prod-specific__price">$${prod.price}</p>
      <p class="prod-specific__desc mb-4">${prod.description}</p>

      <div class="prod-specific__btn">
        <button class="btn btn-blue" id="buy" data-id="${prod.id}" data-title="${prod.title}"
          data-price="${prod.price}" data-desc="${prod.description}"
          data-img="${prod.image.formats.small.url}">
          <i class="fa-solid ${icon} mr-2"></i>
          <span class="add-btn-text">Add to cart</span>
        </button>
      </div>
    </div>
  `;

  const addToCartBtns = document.querySelectorAll("#buy");

  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", toggleProductCart);
  });
}

/* function createHTML(prod, icon) {
  container.innerHTML = `
    <div class="prod-specific__img mb-2">
      <img src="${baseUrl}${prod.image.formats.small.url}" alt="${prod.image.alternativeText}" />
    </div>
    
    <div class="prod-specific__info">
      <p class="prod-specific__price">$${prod.price}</p>
      <p class="prod-specific__desc mb-4">${prod.description}</p>

      <div class="prod-specific__btn">
        <button class="btn btn-blue" id="buy" data-id="${prod.id}" data-title="${prod.title}"
          data-price="${prod.price}" data-desc="${prod.description}"
          data-img="${prod.image.formats.small.url}">
          <i class="fa-solid ${icon} mr-2"></i>
          <span class="add-btn-text">Add to cart</span>
        </button>
      </div>
    </div>
  `;
} */

/*       <div class="form-group prod-specific__size">
        <select class="form-control" id="shoeSize">
          <option selected disabled>Select size</option>
          <option>37</option>
          <option>38</option>
          <option disabled>39 (sold out)</option>
          <option>40</option>
          <option>41</option>
        </select>
      </div> */

/*     let icon = "fa-plus";

    const cart = getCart();
    const product = cart.find((item) => parseInt(item.id) === prod.id);

    if (product) {
      icon = "fa-minus";
      console.log(product);
      const addCartText = document.querySelectorAll("add-btn-text");
      addCartText.forEach((btn) => {
        btn.innerHTML = "Remove";
      });
    }

    createHTML(prod, icon);

    const addToCartBtns = document.querySelectorAll("#buy");

    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", toggleProductCart);
    }); */
