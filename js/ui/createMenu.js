import { getUsername } from "../utils/storage.js";
import logoutButton from "./logout.js";

export default function createMenu() {
  const { pathname } = document.location;

  const container = document.querySelector(".menu");
  const loginIcon = document.querySelector(".login-icon-container");
  const username = getUsername();
  console.log(username);

  let authLink = "";

  if (username) {
    authLink = `<li class="nav-item nav__item me-lg-3 ${
      pathname === "/admin-products.html" ? "active nav__item--active" : ""
    }">
      <a href="admin-products.html" class="nav-link nav__link ${
        pathname === "/admin-products.html" ? "nav__link--active" : ""
      }">
      All products</a>
    </li>

    <li class="nav-item nav__item ${
      pathname === "/add-product.html" ? "active nav__item--active" : ""
    }">
      <a href="add-product.html" class="nav-link nav__link ${
        pathname === "/add-product.html" ? "nav__link--active" : ""
      }">
      Add</a>
    </li>
  `;

    loginIcon.innerHTML = `<button id="logout">Log out</button>`;
    logoutButton();
  }

  container.innerHTML = `${authLink}`;
}
