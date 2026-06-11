import { getFromLocale, saveToLocale } from "./helpers.js";
import {
  renderCartItems,
  renderCartQuantity,
  renderCartTotal,
  renderNotFound,
} from "./ui.js";

let cart = getFromLocale("cart");

const addToCart = (e, products) => {
  const productId = +e.target.dataset.id;

  const foundedProduct = products.find((product) => product.id === productId);

  const exitingProduct = cart.find((item) => item.id === productId);

  if (exitingProduct) {
    exitingProduct.quantity++;
  } else {
    const cartItem = {
      ...foundedProduct,
      quantity: 1,
    };

    cart.push(cartItem);
  }

  saveToLocale("cart", cart);

  e.target.textContent = "Added";

  setTimeout(() => {
    e.target.textContent = "Add to cart";
  }, 2000);

  renderCartQuantity(cart);
};

const removeFromCart = (e) => {
  const response = confirm("Do you confirm to delete this product?");

  if (response) {
    const productId = Number(e.target.dataset.id);

    cart = cart.filter((item) => item.id !== productId);

    saveToLocale("cart", cart);

    renderCartTotal(cart);

    if (cart.length > 0) {
      renderCartItems(cart);
    } else {
      renderNotFound();
    }
  }

  renderCartQuantity(cart);
};

const onQuantityChange = (e) => {
  const productId = parseInt(e.target.dataset.id);

  const newQuantity = parseInt(e.target.value);

  if (newQuantity > 0) {
    const updateItem = cart.find((item) => item.id === productId);

    updateItem.quantity = newQuantity;

    saveToLocale("cart", cart);

    renderCartTotal(cart);

    renderCartQuantity(cart);
  } else {
    alert("Plase enter a value grater than 0");

    return;
  }
};

export { addToCart, removeFromCart, onQuantityChange };
