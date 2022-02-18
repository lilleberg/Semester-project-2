import { getUsername } from "../utils/storage.js";

export default function createMenu() {
  const { pathname } = document.location;

  const container = document.querySelector(".menu");
  const loginIcon = document.querySelector(".login-icon");
  const username = getUsername();
  console.log(username);

  let authLink = `<a href="login.html" class="${
    pathname === "/login.html" ? "active" : ""
  }>Sign in</a>`;

  loginIcon.style.display = "block";

  if (username) {
    loginIcon.style.display = "none";

    authLink = `<li class="nav-item nav__item me-lg-3 ${
      pathname === "/admin/products.html" ? "active nav__item--active" : ""
    }">
      <a href="admin/products.html" class="nav-link nav__link ${
        pathname === "/admin/products.html" ? "nav__link--active" : ""
      }">
      All products</a>
    </li>

    <li class="nav-item nav__item ${
      pathname === "/admin/add-product.html" ? "active nav__item--active" : ""
    }">
      <a href="admin/add-product.html" class="nav-link nav__link ${
        pathname === "/admin/add-product.html" ? "nav__link--active" : ""
      }">
      Add</a>
    </li>

    <li class="nav-item nav__item">
      <a href="../index.html" id="logout" class="nav-link nav__link">Log out</a>
    </li>
  `;
  }

  container.innerHTML = `${authLink}`;
}
