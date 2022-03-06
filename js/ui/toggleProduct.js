import { getCart, addToCart } from "../utils/storage.js";
import { cartAmount } from "./cartAmount.js";

export default function toggleProductCart() {
  const icon = document.querySelector("#buy i");
  icon.classList.toggle("fa-plus");
  icon.classList.toggle("fa-minus");

  let btnText = document.querySelector(".btn-text");
  if (btnText.innerHTML === "Add to cart") {
    btnText.innerHTML = "Remove";
  } else {
    btnText.innerHTML = "Add to cart";
  }

  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const desc = this.dataset.desc;
  const img = this.dataset.img;

  const cart = getCart();
  const item = cart.find((item) => item.title === title);

  if (!item) {
    const newProd = {
      id: id,
      title: title,
      description: desc,
      price: price,
      image: {
        url: img,
        alternativeText: title,
      },
    };

    cart.push(newProd);
    addToCart(cart);
  } else {
    const updatedList = cart.filter((item) => item.title !== title);
    addToCart(updatedList);
  }
  cartAmount();
}
