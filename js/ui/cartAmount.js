import { getCart } from "../utils/storage.js";

export function cartAmount() {
  const cart = getCart();

  let cartCounter = cart.length;
  const amountCart = document.querySelector(".amount-cart");
  amountCart.innerHTML = `${cartCounter}`;

  if (cart.length === 0) {
    document.querySelector(".amount-cart").style.display = "none";
  }
}

cartAmount();
