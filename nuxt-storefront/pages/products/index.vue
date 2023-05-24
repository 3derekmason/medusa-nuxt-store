<template>
  <div class="productsPage">
    <div>
      <h1>All Products</h1>
    </div>
    <div v-if="products.length" class="productContainer">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :item="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useMedusaClient();
const { products } = await client.products.list();
</script>

<style>
.productsPage {
  padding: 0.5em;
  width: 100vw;
}

.productContainer {
  margin-top: 1em;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
  padding: 0.5em;
  border: 1px solid var(--primary-main);
}
</style>
