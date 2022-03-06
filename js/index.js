import createMenu from "./ui/createMenu.js";
import { baseUrl } from "./settings/api.js";
import renderProducts from "./ui/renderProducts.js";
import { cartAmount } from "./ui/cartAmount.js";

createMenu();
cartAmount();

/*Hero image part*/
const heroUrl = baseUrl + "/home";
const heroContainer = document.querySelector(".jumbotron");
(async function () {
  try {
    const response = await fetch(heroUrl);
    const data = await response.json();

    heroContainer.innerHTML += `
      <img src="${baseUrl}${data.hero_banner.url}" alt="${data.hero_banner_alt_text}" class="jumbotron__img">
    `;
  } catch (error) {
    console.log(error);
  }
})();

/* Featured products section */
const url = baseUrl + "/products?featured=true";

(async function () {
  try {
    const response = await fetch(url);
    const data = await response.json();

    renderProducts(data);
  } catch (error) {
    console.log(error);
  }
})();
