import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  // a function that returns a fresh state
  state: () => ({
    cart: {},
    customer: "",
  }),
  // optional getters
  getters: {},
  // optional actions
  actions: {
    setCart(newCart) {
      this.cart = newCart;
    },
    setCustomer(id) {
      this.customer = id;
    },
  },
});
