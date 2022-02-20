import createMenu from "./ui/createMenu.js";
import { baseUrl } from "./settings/api.js";

createMenu();

const container = document.querySelector(".products");
const url = baseUrl + "/products";

(async function () {
  try {
    const response = await fetch(url);
    const data = await response.json();

    createHTML(data);
  } catch (error) {
    console.log(error);
  }
})();

function createHTML(products) {
  container.innerHTML = "";

  products.forEach((prod) => {
    container.innerHTML += `
    <div class="sections">
        <p class="sections__part">Id</p>
        <p class="sections__part></p>
        <p class="sections__part">Title</p>
        <p class="sections__part">Description</p>
        <p class="sections__part">Price</p>
      </div>
      <div class="products__info">
        <p>${prod.id}</p>
        <img src="${baseUrl}${prod.image.url}" alt="${prod.image.alternativeText}">
        <p>${prod.title}</p>
        <p>${prod.description}</p>
        <p>${prod.price}</p>
      </div>
    `;
  });
}
