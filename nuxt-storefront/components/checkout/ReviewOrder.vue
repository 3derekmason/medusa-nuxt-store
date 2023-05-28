<template>
  <h1>Review/Place Order</h1>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/main";
const client = useMedusaClient();
const main = useMainStore();
client.carts.createPaymentSessions(main.cart.id).then(({ cart }) => {
  console.log(cart.payment_sessions);
});
</script>
