<template>
  <header class="navbar">
    <nav>
      <span>
        <NuxtLink v-if="$route.path !== '/'" to="/"> Home </NuxtLink>
        <NuxtLink v-if="$route.path !== '/products'" to="/products">
          Products
        </NuxtLink>
      </span>

      <div class="logo">
        <h1>Medusa/Nuxt Store</h1>
      </div>
      <span>
        <NuxtLink v-if="$route.path !== '/account'" to="/account">{{
          !main.customer.email
            ? "Log in/Sign up"
            : main.customer.first_name
            ? main.customer.first_name
            : "Account"
        }}</NuxtLink>
        <NuxtLink v-if="$route.path !== '/cart'" to="/cart" class="cartNav"
          >Cart
          <span>{{
            main.cartPickup.items?.length + main.cartShipping.items?.length || 0
          }}</span></NuxtLink
        >
      </span>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useMainStore } from "../../store/main";
const main = useMainStore();
</script>

<style scoped>
.navbar {
  width: 100vw;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--primary-main);
  color: #efefef;
  display: flex;
  align-items: center;
  padding: 0px 16px;

}

.navbar nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 8px;

}

.logo {
  display: flex;
  align-items: center;
  gap: 1em;
}

.navbar span {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

.navbar a {
  color: #fefefe;
}

.cartNav {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.cartNav span {
  width: 24px;
  padding: 0.25em 0.5em;
  border-radius: 4px;
  border: 1px solid #fefefe;
  background: #ffffff10;
  font-size: 12px;
}

.navbar a:hover > span {
  text-decoration: none;
}
</style>
