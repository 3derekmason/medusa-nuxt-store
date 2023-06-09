<template>
  <div class="shippingOptions">
    <h2>Shipping Options</h2>
    <div class="cartItems">
      <h4 v-if="hasPickupItem()">Pickup in store: (Denver, CO)</h4>
      <div class="inStore">
        <div class="cartItem" v-for="item in main.cart.items">
          <div v-if="item.metadata.in_store_pickup">
            <img :src="item.thumbnail" :alt="item.title" width="80" />
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
      <h4 v-if="hasPickupItem()">To be shipped:</h4>
      <div class="toShip">
        <div class="cartItem" v-for="item in main.cart.items">
          <div v-if="!item.metadata.in_store_pickup">
            <img :src="item.thumbnail" :alt="item.title" width="80" />
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="optionList">
      <p><em>How would you like to ship items?</em></p>
      <span v-for="option in availableOptions">
        <input
          type="checkbox"
          :name="option.name"
          @change="addOption(option.id)"
        />
        <label :for="option.name">{{ option.name.split(" ")[1] }}:</label>
        <p>+{{ option.price_incl_tax / 100 }}</p>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/main";

const client = useMedusaClient();
const main = useMainStore();

const availableOptions = await client.shippingOptions
  .listCartOptions(main.cart.id)
  .then(({ shipping_options }) => shipping_options);

const addOption = async (optionId: string) => {
  await client.carts
    .addShippingMethod(main.cart.id, {
      option_id: optionId,
    })
    .then(({ cart }) => {
      main.setCart(cart);
    });
};

const hasPickupItem = () => {
  let result = false;
  main.cart.items.forEach((item) => {
    if (item.metadata.in_store_pickup) {
      result = true;
    }
  });
  return result;
};
</script>

<style>
.shippingOptions {
  padding: 1em;
}

.cartItems {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
}

.cartItems h4 {
  background: var(--primary-main);
  color: #efefef;
  padding: 0 0.5em;
}

.cartItem {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.25em;
}

.optionList {
  padding: 1em;
}

.optionList span {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.inStore,
.toShip {
  display: flex;
  align-items: center;
}
</style>
