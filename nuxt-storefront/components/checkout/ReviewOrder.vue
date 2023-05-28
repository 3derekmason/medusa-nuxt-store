<template>
  <h1>Review/Place Order</h1>
  <p>Subtotal: {{ main.cart.subtotal / 100 }}</p>
  <p>Shipping: {{ main.cart.shipping_total / 100 }}</p>
  <hr />
  <p>Total: {{ main.cart.total / 100 }}</p>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/main";
const client = useMedusaClient();
const main = useMainStore();
console.log(main.cart);
client.carts.createPaymentSessions(main.cart.id).then(({ cart }) => {
  console.log(cart.payment_sessions);
});
</script>
