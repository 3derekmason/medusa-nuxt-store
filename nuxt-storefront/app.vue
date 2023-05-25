<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useMainStore } from "./store/main";
import { storeToRefs } from "pinia";
const client = useMedusaClient();
const main = useMainStore();
onMounted(() => {
  client.carts.create().then(({ cart }) => {
    localStorage.setItem("cart_id", cart.id);
    main.setCart(cart);
  });
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap");
:root {
  --primary-main: #003b5c;
  --secondary-main: #00dfff;
  --font-main: "Inter", sans-serif;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: var(--font-main);
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:active {
  opacity: 0.6;
}
</style>
