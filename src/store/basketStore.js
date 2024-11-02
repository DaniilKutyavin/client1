import { makeAutoObservable } from "mobx";
import { getBasket } from "../http/productApi";

class BasketStore {
  items = [];
  totalAmount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async loadBasket(userId) {
    try {
      const data = await getBasket(userId);
      this.items = data.basket_products || [];
      this.calculateTotal();
    } catch (error) {
      console.error("Error fetching basket:", error);
    }
  }

  calculateTotal() {
    this.totalAmount = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  addItem(item) {
    const existingItem = this.items.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
    this.calculateTotal();
  }

  removeItem(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
    this.calculateTotal();
  }
}

export const basketStore = new BasketStore();
