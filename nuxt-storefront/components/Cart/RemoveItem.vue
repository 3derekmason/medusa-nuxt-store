<template>
  <button @click="removeItem()" class="remove">X</button>
</template>

<script setup lang="ts">
import { useMainStore } from "../../store/main";
const main = useMainStore();
const client = useMedusaClient();
const props = defineProps<{
  lineId: string;
}>();
const removeItem = () => {
  if (main.cartPickup.items.some((item) => item.id === props.lineId)) {
    client.carts.lineItems
      .delete(main.cartPickup.id, props.lineId)
      .then(({ cart }) => {
        main.setPickupCart(cart);
      });
  }
  if (main.cartShipping.items.some((item) => item.id === props.lineId)) {
    client.carts.lineItems
      .delete(main.cartShipping.id, props.lineId)
      .then(({ cart }) => {
        main.setShipCart(cart);
      });
  }
};
</script>

<style>
.remove {
  border: none;
  background: none;
  color: #d50000;
  font-size: 14px;
  cursor: pointer;
}
.remove:hover {
  color: var(--secondary-main);
}
</style>
