import { cartAmount } from "./ui/cartAmount.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./ui/createMenu.js";
import otherProds from "./ui/otherProds.js";
import addProdToCart from "./ui/addToCart.js";

createMenu();
otherProds();
cartAmount();

const params = new URLSearchParams(document.location.search);
const id = params.get("id");

if (!id) location.href = "index.html";

const url = baseUrl + `/products/${id}`;
const container = document.querySelector(".prod-specific");

(async function () {
  try {
    const response = await fetch(url);
    const prod = await response.json();

    document.querySelector("title").innerHTML = `Shoes Up | ${prod.title}`;
    document.querySelector("h1").innerHTML = `${prod.title}`;

    container.innerHTML = "";
    createHTML(prod);

    const buyBtn = document.querySelectorAll("#buy");

    buyBtn.forEach((btn) => {
      btn.addEventListener("click", addProdToCart(prod, btn));
    });
  } catch (error) {
    console.log(error);
  }
})();

function createHTML(prod) {
  container.innerHTML = `
    <div class="prod-specific__img mb-2">
      <img src="${baseUrl}${prod.image.formats.small.url}" alt="${prod.image.alternativeText}" />
    </div>
    
    <div class="prod-specific__info">
      <p class="prod-specific__price">$ ${prod.price}</p>
      <p class="prod-specific__desc mb-4">${prod.description}</p>

      <div class="form-group prod-specific__size">
        <select class="form-control" id="shoeSize">
          <option selected disabled>Select size</option>
          <option>37</option>
          <option>38</option>
          <option disabled>39 (sold out)</option>
          <option>40</option>
          <option>41</option>
        </select>
      </div>

      <div class="prod-specific__btn">
        <button class="btn btn-blue" id="buy" data-id="${prod.id}">Add to cart</button>
      </div>
    </div>
  `;
}
