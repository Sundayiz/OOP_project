class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Method to add an item to the cart
  addItem(product, quantity) {
    // Check if the product already exists in the cart
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const cartItem = new ShoppingCartItem(product, quantity);
      this.items.push(cartItem);
    }
  }

  // Method to remove an item from the cart
  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  // Method to get the total price of all items in the cart
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  // Method to display the items in the cart
  displayCart() {
    if (this.items.length === 0) {
      console.log("The cart is empty.");
    } else {
      console.log("Items in the cart:");
      this.items.forEach((item) => {
        console.log(
          `- ${item.product.name}: $${item.product.price} x ${
            item.quantity
          } = $${item.getTotalPrice()}`
        );
      });
      console.log(`Total: $${this.getTotalPrice()}`);
    }
  }
}

// Create some products
const product1 = new Product(1, "Laptop", 1000);
const product2 = new Product(2, "Smartphone", 500);
const product3 = new Product(3, "Headphones", 100);

// Create a shopping cartS
const cart = new ShoppingCart();

// Add items to the cart
cart.addItem(product1, 1);
cart.addItem(product2, 2);
cart.addItem(product3, 3);

// Display the cart
cart.displayCart();

// Remove an item from the cart
cart.removeItem(2);

// Display the cart again after removing an item
cart.displayCart();
