import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";

export default async function deleteProduct() {
  const id = this.dataset.delete;
  const deleteProduct = confirm(
    "Are you sure you want to delete this product?"
  );

  if (deleteProduct) {
    const url = baseUrl + "/products/" + id;

    const token = getToken();

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      location.href = "admin_products.html";
    } catch (error) {
      console.log(error);
    }
  }
}
