import renderProducts from "./renderProducts.js";

export default function filterSearch(products) {
  const search = document.querySelector(".search");

  console.log("Prods", products);
  search.onkeyup = function (e) {
    const searchValue = e.target.value.trim().toLowerCase();
    console.log(searchValue.length);
    const results = products.filter((prod) => {
      if (prod.title.toLowerCase().includes(searchValue)) return true;
    });

    /*     if (results.length === 0) {
      document.querySelector(".prods").innerHTML += `
        <p>No results found for '${searchValue}'</p>
      `;
    } */

    if (searchValue.length === 0) renderProducts(products);

    renderProducts(results);
  };
}
