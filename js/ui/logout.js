import { clearUserLogin } from "../utils/storage.js";

export default function logoutButton() {
  const button = document.querySelector("#logout");

  if (button) {
    button.onclick = function () {
      const logout = confirm("Are you sure you want to log out?");

      if (logout) {
        clearUserLogin();
        location.href = "/";
      }
    };
  }
}
