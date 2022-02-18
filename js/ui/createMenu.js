import { getUsername } from "../utils/storage.js";
import logoutButton from "./logout.js";

export default function createMenu() {
  const { pathname } = document.location;

  const container = document.querySelector(".menu");
  const loginIcon = document.querySelector(".login-icon-container");
  const username = getUsername();
  console.log(username);
  console.log(location.href);

  let authLink = "";

  if (username) {
    authLink = `<li class="nav-item nav__item mr-lg-3 ${
      pathname === "/admin_products.html" ? "active nav__item--active" : ""
    }">
      <a href="admin_products.html" class="nav-link nav__link ${
        pathname === "/admin_products.html" ? "nav__link--active" : ""
      }">
      All products</a>
    </li>

    <li class="nav-item nav__item ${
      pathname === "/add_product.html" ? "active nav__item--active" : ""
    }">
      <a href="add_product.html" class="nav-link nav__link ${
        pathname === "/add_product.html" ? "nav__link--active" : ""
      }">
      Add</a>
    </li>
  `;

    loginIcon.innerHTML = `<button id="logout">Log out</button>`;
    logoutButton();
  }

  container.innerHTML = `${authLink}`;
}
