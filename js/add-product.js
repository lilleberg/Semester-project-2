import { baseUrl } from "./settings/api.js";
import { cartAmount } from "./ui/cartAmount.js";
import createMenu from "./ui/createMenu.js";
import displayMessage from "./ui/displayMessage.js";
import { getToken } from "./utils/storage.js";

const token = getToken();
if (!token) location.href = "/";

createMenu();
cartAmount();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image = document.querySelector("#uploadFile");
const checkbox = document.querySelector("#checkbox");
const message = document.querySelector(".message-container");
let featured = false;

form.onsubmit = function (e) {
  e.preventDefault();

  message.innerHTML = "";
  const titleVal = title.value.trim();
  const priceVal = parseFloat(price.value.trim());
  const descriptionVal = description.value.trim();
  const imageVal = image.files[0];

  if (
    titleVal.length === 0 ||
    priceVal.length === 0 ||
    descriptionVal.length === 0 ||
    imageVal.length === 0
  ) {
    displayMessage(
      "warning",
      "Please enter proper values",
      ".message-container"
    );
  }
  addProduct(titleVal, priceVal, descriptionVal, imageVal, featured);
  document.querySelector("#cancel").innerHTML = "Back";
  form.reset();
};
const url = baseUrl + "/products";

async function addProduct(title, price, desc, img, featured) {
  const data = {
    title: title,
    price: price,
    description: desc,
    featured: featured,
  };

  const formData = new FormData();

  formData.append("files.image", img, img.name);
  formData.append("data", JSON.stringify(data));

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.published_at)
      displayMessage("success", "Product added", ".message-container");

    if (json.error)
      displayMessage("error", "Could not add product", ".message-container");
  } catch (error) {
    console.log(error);
  }
}

function isChecked() {
  if (this.checked) {
    featured = true;
  } else {
    featured = false;
  }
}

checkbox.addEventListener("click", isChecked);
