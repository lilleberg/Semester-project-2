import createMenu from "./ui/createMenu.js";
import { baseUrl } from "./settings/api.js";
import renderProducts from "./ui/renderProducts.js";

createMenu();

const heroUrl = baseUrl + "/home";
const heroContainer = document.querySelector(".jumbotron");
(async function () {
  try {
    const response = await fetch(heroUrl);
    const data = await response.json();

    heroContainer.innerHTML += `
      <img src="${baseUrl}${data.hero_banner.url}" alt="${data.hero_banner_alt_text}">
    `;
  } catch (error) {
    console.log(error);
  }
})();

const url = baseUrl + "/products?featured=true";

(async function () {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    renderProducts(data);
  } catch (error) {
    console.log(error);
  }
})();

/* displayMessage("error", "Uh oh, something's gone wrong on our end!", ".message-container"); */
