import createMenu from "./ui/createMenu.js";
import { baseUrl } from "./settings/api.js";
import renderProducts from "./ui/renderProducts.js";

createMenu();

const url = baseUrl + "/products";

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
