import { baseUrl } from "./settings/api.js";
import { cartAmount } from "./ui/cartAmount.js";
import createMenu from "./ui/createMenu.js";
import { getToken } from "./utils/storage.js";
import displayMessage from "./ui/displayMessage.js";

const token = getToken();
if (!token) location.href = "/";

createMenu();
cartAmount();

const params = new URLSearchParams(document.location.search);
const id = params.get("id");
if (!id) location.href = "admin_products.html";

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
let image = document.querySelector("#uploadFile");
const fileName = document.querySelector("#fileName");
const checkbox = document.querySelector("#checkbox");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loader = document.querySelector(".spinner-grow");
let featured = false;

const url = baseUrl + "/products/" + id;

(async function () {
  try {
    const response = await fetch(url);
    const json = await response.json();

    title.value = json.title;
    price.value = json.price;
    description.value = json.description;
    fileName.innerHTML = json.image.name;

    checkbox.checked = json.featured;
    idInput.value = json.id;
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = "none";
  }
})();

form.onsubmit = function (e) {
  e.preventDefault();

  message.innerHTML = "";

  const titleVal = title.value.trim();
  const priceVal = parseFloat(price.value.trim());
  const descriptionVal = description.value.trim();
  const imageVal = image.files[0];
  const idVal = idInput.value;

  if (
    titleVal.length === 0 ||
    priceVal.length === 0 ||
    typeof priceVal !== "number" ||
    descriptionVal.length === 0
  ) {
    displayMessage(
      "warning",
      "Please enter proper values",
      ".message-container"
    );
  }
  updateProduct(titleVal, priceVal, descriptionVal, imageVal, idVal, featured);
  window.scrollTo(0, 100);
  document.querySelector("#cancel").innerHTML = `Back`;
};

async function updateProduct(title, price, desc, img, id, featured) {
  const url = baseUrl + "/products/" + id;

  const data = {
    title: title,
    price: price,
    description: desc,
    featured: featured,
  };

  const formData = new FormData();

  if (img) {
    formData.append("files.image", img, img.name);
    fileName.innerHTML = img.name;
  }
  formData.append("data", JSON.stringify(data));

  const options = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.updated_at)
      displayMessage("success", "Product updated", ".message-container");

    if (json.error)
      displayMessage("error", "Could not update product", ".message-container");
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
  console.log(featured);
}

checkbox.addEventListener("click", isChecked);
