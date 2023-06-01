<template>
  <div class="cartPage">
    <h3 v-if="allItems.length < 1">
      Nothing here! <NuxtLink to="/products">Browse products?</NuxtLink>
    </h3>
    <div class="store">
      <p>Your store:</p>
      <caption>
        Denver, CO
      </caption>
    </div>
    <ul class="cartItems">
      <li v-for="item in allItems">
        <CartRemoveItem :lineId="item.id" />
        <img :alt="item.title" :src="item.thumbnail" width="120" />
        <span class="aboutItem">
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
          <h5>{{ item.unit_price / 100 }}</h5>
        </span>
      </li>
    </ul>
    <div class="subtotal">
      <span>
        <caption>
          Subtotal:
        </caption>
        <p>{{ subtotal / 100 || "0.00" }}</p>
      </span>
      <span>
        <caption>
          Discount:
        </caption>
        <p>{{ discountTotal / 100 || "0.00" }}</p>
      </span>
      <span>
        <caption>
          Tax:
        </caption>
        <p>{{ taxTotal / 100 || "0.00" }}</p>
      </span>
    </div>
    <div class="total">
      <NuxtLink to="/checkout">Proceed to checkout</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "../store/main";
const main = useMainStore();
const allItems = ref(main.cartPickup.items.concat(main.cartShipping.items));
const subtotal = main.cartPickup.subtotal + main.cartShipping.subtotal;
const discountTotal =
  main.cartPickup.discount_total + main.cartShipping.discount_total;
const taxTotal =
  main.cartPickup.item_tax_total + main.cartShipping.item_tax_total;

watchEffect(() => {
  if (
    main.cartPickup.items.length + main.cartShipping.items.length !==
    allItems.length
  ) {
    allItems.value = main.cartPickup.items.concat(main.cartShipping.items);
  }
});
</script>

<style>
.cartPage {
  padding: 1em;
}

.store {
  display: flex;
  align-items: center;
  gap: 1em;
}
.cartItems li {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin: 0.5em 0;
  padding: 0.5em;
  border: 1px solid var(--primary-main);
  border-radius: 4px;
}

.aboutItem {
  display: flex;
  flex-direction: column;
}

.subtotal,
.total {
  border-top: 1px solid #212121;
  padding: 0.25em;
}

.subtotal span {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.subtotal span caption {
  text-align: left;
  width: 8em;
}

.total {
  height: 3em;
  font-size: 1.25em;
  color: var(--primary-main);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
}

.total a {
  display: grid;
  place-content: center;
  padding: 0.5em 0.5em;
  height: 40px;
  border: none;
  border-radius: 0.5em;
  background: var(--primary-main);
  color: #fefefe;
  font-size: 14px;
  text-transform: uppercase;
  box-shadow: 0 4px 0 #212121;
}

.total a:hover {
  text-decoration: none;
}

.total a:active {
  transform: translateY(4px);
  box-shadow: none;
}
</style>
