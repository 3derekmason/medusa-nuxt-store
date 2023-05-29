<template>
  <div class="homePage">
    <HeroSection />
    <h2>
      Welcome back{{
        main.customer.first_name ? `, ${main.customer.first_name}!` : "!"
      }}
    </h2>
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
import { useMainStore } from "~/store/main";
const client = useMedusaClient();
const main = useMainStore();
const { products } = await client.products.list();
</script>

<style>
.homePage {
  padding: 0.5em;
}
.homePage h2 {
  text-align: center;
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
