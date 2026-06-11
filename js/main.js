import fetchProducts from "./api.js";
import { addToCart } from "./cart.js";
import { getFromLocale } from "./helpers.js";
import {
  renderCartItems,
  renderCartQuantity,
  renderCartTotal,
  renderNotFound,
  renderProduct,
  uiElements,
} from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  uiElements.menuBtn.addEventListener("click", () => {
    uiElements.nav.classList.toggle("open");
  });

  let cart = getFromLocale("cart");

  renderCartQuantity(cart);

  if (window.location.pathname.includes("/index.html")) {
    const products = await fetchProducts();

    renderProduct(products, (e) => {
      addToCart(e, products);
    });
  } else {
    if (cart.length > 0) {
      renderCartItems(cart);

      renderCartTotal(cart);
    } else {
      renderNotFound();
    }
  }
});
