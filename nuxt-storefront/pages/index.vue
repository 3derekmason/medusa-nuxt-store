<template>
  <div>
    <div>
      <h4>All Products</h4>
    </div>
    <div v-if="products.length">
      <div v-for="(product, i) in products">
        <ProductCard :key="i" :item="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useMedusaClient();
const { products } = await client.products.list();
</script>
