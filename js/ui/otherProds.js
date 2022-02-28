import { baseUrl } from "../settings/api.js";
import renderProducts from "./renderProducts.js";

const url = baseUrl + "/products";
const container = document.querySelector(".other-prods");

export default function otherProds() {
  (async function () {
    try {
      const response = await fetch(url);
      const data = await response.json();

      for (let i = 0; i < 6; i++) {
        const prod = data[i];

        createHTML(prod, container);
      }
    } catch (error) {
      console.log(error);
    }
  })();
}

function createHTML(prod, container) {
  container.innerHTML += `
  <div class="other-prods__product mt-3">
    <a href="product_specific.html?id=${prod.id}">
      <div class="card">
        <img src="${baseUrl}${prod.image.url}" class="card-img-top other-prods__img" alt="${prod.image.alternativeText}">
        <div class="card-body other-prods__body">
          <h2 class="card-title other-prods__title prod-title">${prod.title}</h2>
          <p class="other-prods__price">$ ${prod.price}</p>
        </div>
      </div>
    </a>
  </div>
`;
}
