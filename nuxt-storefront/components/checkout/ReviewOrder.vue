<template>
  <h1>Review/Place Order</h1>
  <div class="preview">
    <span class="orderItem" v-for="item in allItems">
      <img :src="item.thumbnail" :alt="item.title" width="120" />
    </span>
  </div>
  <p>Subtotal: {{ subtotal / 100 }}</p>
  <p>Shipping: {{ main.cartShipping.shipping_total / 100 }}</p>
  <hr />
  <p>Total: {{ total / 100 }}</p>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/main";
const client = useMedusaClient();
const main = useMainStore();
await client.carts
  .createPaymentSessions(main.cartShipping.id)
  .then(({ cart }) => {
    main.setShipCart(cart);
  });
await client.carts
  .updatePaymentSession(
    main.cartShipping.id,
    main.cartShipping.payment_sessions[0].provider_id,
    {
      data: {
        test: true,
      },
    }
  )
  .then(({ cart }) => {
    main.setShipCart(cart);
    console.log(cart.payment_session.data);
  });
const allItems = main.cartPickup.items.concat(main.cartShipping.items);
const subtotal = main.cartPickup.subtotal + main.cartShipping.subtotal;
const total = main.cartPickup.total + main.cartShipping.total;
</script>
