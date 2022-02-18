export default function displayMessage(type, message, target) {
  const element = document.querySelector(target);
  element.innerHTML = `<div class="message ${type}">${message}</div>`;
}
