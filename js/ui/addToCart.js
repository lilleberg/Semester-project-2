import { getCart, addToCart } from "../utils/storage.js";
import { cartAmount } from "./cartAmount.js";

export default function addProdToCart(prod, btn) {
  const cart = getCart();

  cart.push(prod);
  addToCart(cart);

  cartAmount();
}
