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
await client.carts.createPaymentSessions(main.cart.id).then(({ cart }) => {
  main.setCart(cart);
  console.log(cart.payment_sessions);
});
await client.auth
  .authenticate({
    email: "derek@powerfulweb.com",
    password: "Medusa123",
  })
  .then(({ customer }) => {
    main.setCustomer(customer.id);
    client.carts
      .update(main.cart.id, {
        customer_id: customer.id,
      })
      .then(({ cart }) => {
        main.setCart(cart);
      });
  });
</script>
