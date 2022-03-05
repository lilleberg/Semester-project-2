export default function displayMessage(type, message, target) {
  const element = document.querySelector(target);
  element.innerHTML = `<p class="message ${type}">${message}</p>`;
}
