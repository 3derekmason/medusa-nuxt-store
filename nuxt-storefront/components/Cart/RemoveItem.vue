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
  client.carts.lineItems.delete(main.cart.id, props.lineId).then(({ cart }) => {
    main.setCart(cart);
  });
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
