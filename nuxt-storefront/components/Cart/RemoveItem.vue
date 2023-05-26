<template>
  <button @click="removeItem()" class="remove">Remove from cart</button>
</template>

<script setup lang="ts">
import { useMainStore } from "../../store/main";
const main = useMainStore();
const client = useMedusaClient();
const props = defineProps<{
  lineId: string;
}>();
const removeItem = () => {
  client.carts.lineItems.delete(main.cart.id, props.lineId).then(({ cart }) => {
    main.setCart(cart);
  });
};
</script>

<style>
.remove {
  border: none;
  background: none;
  color: var(--secondary-main);
  font-size: 14px;
  cursor: pointer;
}
.remove:hover {
  opacity: 0.8;
}
</style>
