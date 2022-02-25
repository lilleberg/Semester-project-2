import renderProducts from "./renderProducts.js";

export default function filterSearch(products) {
  const search = document.querySelector(".search");
  const noResult = document.querySelector(".no-results");

  search.onkeyup = function (e) {
    const searchValue = e.target.value.trim().toLowerCase();

    const results = products.filter((prod) => {
      if (prod.title.toLowerCase().includes(searchValue)) return true;
    });

    if (results.length === 0) {
      noResult.innerHTML = `
        <p>No results found for '${searchValue}'.</p>
      `;
    } else {
      noResult.innerHTML = "";
    }

    if (searchValue.length === 0) renderProducts(products);

    renderProducts(results);
  };
}
