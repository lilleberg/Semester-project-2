import createMenu from "./ui/createMenu.js";
import { baseUrl } from "./settings/api.js";
import renderProducts from "./ui/renderProducts.js";
import filterSearch from "./ui/filterSearch.js";
import { cartAmount } from "./ui/cartAmount.js";

createMenu();
cartAmount();

const url = baseUrl + "/products";

(async function () {
  try {
    const response = await fetch(url);
    const data = await response.json();

    renderProducts(data);
    filterSearch(data);
  } catch (error) {
    console.log(error);
  }
})();
