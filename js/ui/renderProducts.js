import { baseUrl } from "../settings/api.js";

export default function renderProducts(prods) {
  const productsContainer = document.querySelector(".products");

  productsContainer.innerHTML = "";

  prods.forEach((prod) => {
    productsContainer.innerHTML += `
      <div class="product">
        <a href="product_specific.html?id=${prod.id}">
          <div class="card">
            <img src="${baseUrl}${prod.image.url}" class="card-img-top card__img" alt="${prod.image.alternativeText}">
            <div class="card-body card__body">
              <p class="card-title prod-title card__title">${prod.title}</p>
              <p class="card__price">$${prod.price}</p>
            </div>
          </div>
        </a>
      </div>
    `;
  });
}
