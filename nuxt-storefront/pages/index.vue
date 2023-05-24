<template>
  <div class="homePage">
    <HeroSection />
    <div>
      <h4>Featured Products</h4>
    </div>
    <div v-if="products.length" class="productRow">
      <div v-for="(product, i) in products.slice(0, 4)">
        <ProductCard :key="i" :item="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useMedusaClient();
const { products } = await client.products.list();

onMounted(() => {
  client.carts.create().then(({ cart }) => {
    console.log(cart);
    localStorage.setItem("cart_id", cart.id);
  });
});
</script>

<style>
.homePage {
  padding: 0.5em;
}
.productRow {
  width: 100%;
  padding: 1em 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5em;
  border-top: 2px solid var(--primary-main);
}
</style>
