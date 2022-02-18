const userKey = "user";
const tokenKey = "token";
const cartKey = "cart";

export function addToCart(item) {
  saveToStorage(cartKey, item);
}

export function getCart() {
  return getFromStorage(cartKey);
}

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

export function getToken() {
  return getLoginInfo(tokenKey);
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function getUsername() {
  const user = getLoginInfo(userKey);

  if (user) {
    return user.username;
  }
  return null;
}

export function clearCart() {
  localStorage.removeItem(cartKey);
}

export function clearUserLogin() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return [];
  }
  return JSON.parse(value);
}

function getLoginInfo(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }
  return JSON.parse(value);
}
