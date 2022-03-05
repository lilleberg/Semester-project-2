import createMenu from "./ui/createMenu.js";
import { baseUrl } from "./settings/api.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { cartAmount } from "./ui/cartAmount.js";
import displayMessage from "./ui/displayMessage.js";

createMenu();
cartAmount();

const form = document.querySelector(".login-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

form.onsubmit = function (event) {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    displayMessage("error", "Please enter proper values", ".message-container");
  } else {
    loginUser(usernameValue, passwordValue);
  }
};

async function loginUser(username, password) {
  const url = baseUrl + "/auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "admin_products.html";
    }

    if (json.error) {
      displayMessage(
        "error",
        "Username and/or password is incorrect",
        ".message-container"
      );
      console.log("Error with login");
    }
  } catch (error) {
    console.log(error);
  }
}

document.querySelector("form input").addEventListener("keyup", function (e) {
  e.preventDefault();

  if (e.keyCode === "Enter") {
    document.querySelector("form button").click();
  }
});
