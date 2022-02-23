import createMenu from "./ui/createMenu.js";
import { baseUrl } from "./settings/api.js";

createMenu();

const containerMd = document.querySelector(".admin-products-md");
const containerSm = document.querySelector(".admin-products-sm");
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
  containerMd.innerHTML = "";
  // containerSm.innerHTML = "";

  products.forEach((prod) => {
    containerMd.innerHTML += `
      <div class="info d-grid">
        <p class="info__id">${prod.id}</p>
        <img src="${baseUrl}${prod.image.url}" alt="${prod.image.alternativeText}" class="info__img">
        <p class="info__title">${prod.title}</p>
        <p class="info__desc">${prod.description}</p>
        <p class="info__price">${prod.price}</p>
        <div class="info__edit-del">
          <i class="fa-solid fa-pen"></i>
          <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>
    `;

    /*containerSm.innerHTML += `
      <div class="info info-sm d-md-none">
        <div class="info-sm__sections">
          <p class="sections__part">Id</p>
          <p class="info-sm__id info-sm__elem">${prod.id}</p>
        </div>
        <div class="info-sm__sections">
          <div class="sections__part"></div>
          <img src="${baseUrl}${prod.image.url}" alt="${prod.image.alternativeText}" class="info-sm__img info-sm__elem info__img">
        </div>
        <div class="info-sm__sections">
          <p class="sections__part">Title</p>
          <p class="info-sm__title info-sm__elem">${prod.title}</p>
        </div>
        <div class="info-sm__sections">
          <p class="sections__part">Description</p>
          <p class="info-sm__desc info-sm__elem">${prod.description}</p>
        </div>
        <div class="info-sm__sections">
          <p class="sections__part">Price</p>
          <p class="info-sm__price info-sm__elem">${prod.price}</p>
        </div>
      </div>
    `; */
  });
}
