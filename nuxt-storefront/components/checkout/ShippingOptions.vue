<template>
  <div class="shippingOptions">
    <h2>Shipping Options</h2>
    <div>
      <div class="cartItem" v-for="item in main.cart.items">
        <div class="inStore" v-if="item.metadata.in_store_pickup">
          <h4>To pickup in store:</h4>
          <img :src="item.thumbnail" alt="" width="80" />
          <p>{{ item.title }}</p>
        </div>
        <div class="toShip" v-else>
          <h4>To be shipped:</h4>
          <img :src="item.thumbnail" alt="" width="80" />
          <p>{{ item.title }}</p>
        </div>
      </div>
    </div>
    <div class="optionList">
      <span v-for="option in availableOptions">
        <input
          type="checkbox"
          :name="option.name"
          @change="addOption(option.id)"
        />
        <label :for="option.name">{{ option.name.split(" ")[1] }}:</label>
        <p>{{ option.price_incl_tax / 100 }}</p>
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
</script>

<style>
.shippingOptions {
  padding: 1em;
}

.cartItem {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.25em;
}

.optionList span {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
</style>
