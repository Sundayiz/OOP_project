// Product class to store the properties for id, name, and price
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// ShoppingCartItem class to store the properties for a product and its quantity
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  // Method to calculate the total price of the item
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// ShoppingCart class which contains an array of ShoppingCartItem instances
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Method to add an item to the cart
  addItem(product, quantity = 1) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
    this.updateTotal();
  }

  // Method to remove an item from the cart
  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.updateTotal();
  }

  // Method to get the total price of items in the cart
  getTotal() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  // Method to update the displayed total
  updateTotal() {
    const totalElement = document.querySelector(".total");
    const total = this.getTotal();
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Method to find a cart item by product ID
  findItem(productId) {
    return this.items.find((item) => item.product.id === productId);
  }
}

// Create the shopping cart instance
const cart = new ShoppingCart();

// Sample products
const products = [new Product(1, "Apple", 2), new Product(2, "Banana", 1)];

// Functionality for the like button
document.querySelectorAll(".fa-heart").forEach((heart) => {
  let isLiked = false;
  heart.addEventListener("click", () => {
    isLiked = !isLiked;
    heart.style.color = isLiked ? "red" : "black";
  });
});

// Functionality for the increment button
document.querySelectorAll(".fa-plus-circle").forEach((button, index) => {
  button.addEventListener("click", () => {
    const quantityElement = button.nextElementSibling;
    let quantity = parseInt(quantityElement.textContent) + 1;
    quantityElement.textContent = quantity;

    // Add the corresponding product to the cart
    cart.addItem(products[index], 1);
  });
});

// Functionality for the decrement button
document.querySelectorAll(".fa-minus-circle").forEach((button, index) => {
  button.addEventListener("click", () => {
    const quantityElement = button.previousElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) {
      quantity -= 1;
      quantityElement.textContent = quantity;

      // Remove the corresponding product from the cart
      const product = products[index];
      const item = cart.findItem(product.id);
      if (item && item.quantity > 1) {
        cart.addItem(product, -1);
      } else {
        cart.removeItem(product.id);
      }
    }
  });
});

// Functionality for the remove button
document.querySelectorAll(".fa-trash-alt").forEach((button, index) => {
  button.addEventListener("click", () => {
    const cardBody = button.closest(".card-body");
    const quantityElement = cardBody.querySelector(".quantity");
    const productId = products[index].id;
    const item = cart.findItem(productId);

    // Update the cart total
    if (item) {
      cart.removeItem(productId);
      quantityElement.textContent = "0"; // Reset quantity to 0
    }

    // Optionally, remove the card element from the DOM
    cardBody.remove();
  });
});
