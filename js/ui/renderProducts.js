export default function renderProducts(prods) {
  const productsContainer = document.querySelector(".products");

  productsContainer.innerHTML = "";

  prods.forEach((prod) => {
    productsContainer.innerHTML += `
      <div class="product">
        <a href="product_specific.html?id=${prod.id}">
          <div class="card">
            <img src="http://localhost:1337${prod.image.url}" class="card-img-top card__img" alt="${prod.image.alternativeText}">
            <div class="card-body card__body d-grid">
              <h2 class="card-title card__title">${prod.title}</h2>
              <p class="card__price">$ ${prod.price}</p>
              <a href="product_specific.html?id=${prod.id}" class="btn card__btn btn-blue">View shoe</a>
            </div>
          </div>
        </a>
      </div>
    `;
  });
}
