<template>
  <div class="cartPage">
    <h3 v-if="main.cart.items.length < 1">
      Nothing here! <NuxtLink to="/products">Browse products?</NuxtLink>
    </h3>
    <div class="store">
      <p>Your store:</p>
      <caption>
        Denver, CO
      </caption>
    </div>
    <ul class="cartItems">
      <li v-for="item in main.cart?.items">
        <CartRemoveItem :lineId="item.id" />
        <img alt="" :src="item.thumbnail" width="120" />
        <span class="aboutItem">
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
          <h5>{{ item.unit_price / 100 }}</h5>
        </span>
        <span class="pickup">
          <h6>Select option:</h6>
          <div class="pickupOption">
            <input type="radio" name="store" />
            <label for="store">Pickup in store</label>
          </div>
          <div class="pickupOption">
            <input type="radio" name="deliver" />
            <label for="deliver">Delivery</label>
          </div>
        </span>
      </li>
    </ul>
    <div class="subtotal">
      <span>
        <caption>
          Subtotal:
        </caption>
        <p>{{ main.cart?.subtotal / 100 || "0.00" }}</p>
      </span>
      <span>
        <caption>
          Discount:
        </caption>
        <p>{{ main.cart?.discount_total / 100 || "0.00" }}</p>
      </span>
      <span>
        <caption>
          Tax:
        </caption>
        <p>{{ main.cart?.item_tax_total / 100 || "0.00" }}</p>
      </span>
      <span>
        <caption>
          Shipping:
        </caption>
        <p>{{ main.cart?.shipping_total / 100 || "0.00" }}</p>
      </span>
    </div>
    <div class="total">
      <p>Total: {{ main.cart.total / 100 || 0 }}</p>
      <button>Proceed to checkout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "../store/main";
const main = useMainStore();
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
  gap: 1em;
  margin: 0.5em 0;
  padding: 0.5em;
  border: 1px solid var(--primary-main);
  border-radius: 4px;
}

.aboutItem {
  display: flex;
  flex-direction: column;
}

.pickup {
  padding: 0.25em;
}

.pickupOption {
  display: flex;
  gap: 0.5em;
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

.total button {
  padding: 0.25em 0.5em;
  height: 32px;
  border: none;
  border-radius: 0.5em;
  background: var(--primary-main);
  color: #fefefe;
  text-transform: uppercase;
}
</style>
