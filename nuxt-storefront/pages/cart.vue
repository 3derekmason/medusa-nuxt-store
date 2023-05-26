<template>
  <h3 v-if="main.cart.items.length < 1">
    Nothing here! <NuxtLink to="/products">Browse products?</NuxtLink>
  </h3>
  <ul>
    <li v-for="item in main.cart?.items">
      <CartRemoveItem :lineId="item.id" />
      <img alt="" :src="item.thumbnail" width="120" />
      <p>{{ item.title }}</p>
      <p>{{ item.description }}</p>
      <p>{{ item.unit_price / 100 }}</p>
    </li>
  </ul>
  <hr />
  <p>Subtotal: {{ main.cart?.subtotal / 100 || "0.00" }}</p>
  <p>Discount: {{ main.cart?.discount_total / 100 || "0.00" }}</p>
  <p>Tax: {{ main.cart?.item_tax_total / 100 || "0.00" }}</p>
  <p>Shipping: {{ main.cart?.shipping_total / 100 || "0.00" }}</p>
  <hr />
  <p>Total: {{ main.cart.total / 100 || 0 }}</p>
  <button>Proceed to checkout</button>
</template>

<script setup lang="ts">
import { useMainStore } from "../store/main";
const main = useMainStore();
</script>
