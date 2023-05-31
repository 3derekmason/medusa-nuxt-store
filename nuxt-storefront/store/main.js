import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    cartPickup: {},
    cartShipping: {},
    customer: {},
  }),
  actions: {
    setPickupCart(newCart) {
      this.cartPickup = newCart;
    },
    setShipCart(newCart) {
      this.cartShipping = newCart;
    },
    setCustomer(customer) {
      this.customer = customer;
    },
  },
});
